const els = {
  platformList: document.getElementById('platformList'),
  customDomain: document.getElementById('customDomain'),
  addDomainBtn: document.getElementById('addDomainBtn'),
  localEnabled: document.getElementById('localEnabled'),
  maxEntries: document.getElementById('maxEntries'),
  retentionDays: document.getElementById('retentionDays'),
  logSamples: document.getElementById('logSamples'),
  logIssues: document.getElementById('logIssues'),
  collectingPeriod: document.getElementById('collectingPeriod'),
  samplingPeriod: document.getElementById('samplingPeriod'),
  saveBtn: document.getElementById('saveBtn'),
  saveStatus: document.getElementById('saveStatus'),
};

let platforms = [];
let removedOrigins = []; // matches for platforms removed since last save, to revoke on Save

async function load() {
  const { settings } = await chrome.runtime.sendMessage({ kind: 'get-status' });
  const resp = await chrome.runtime.sendMessage({ kind: 'get-platforms' });
  platforms = resp.platforms;

  els.localEnabled.checked = settings.localLogging.enabled;
  els.maxEntries.value = settings.localLogging.maxEntries;
  els.retentionDays.value = settings.localLogging.retentionDays;

  els.logSamples.checked = settings.logSamples;
  els.logIssues.checked = settings.logIssues;
  els.collectingPeriod.value = settings.clientMonitor.collectingPeriodInMs;
  els.samplingPeriod.value = settings.clientMonitor.samplingPeriodInMs;

  renderPlatforms();
}

async function renderPlatforms() {
  els.platformList.innerHTML = '';
  for (const platform of platforms) {
    const granted = await chrome.permissions.contains({ origins: platform.matches }).catch(() => false);
    const row = document.createElement('div');
    row.className = 'platform-row';
    row.innerHTML = `
      <div>
        <div class="platform-row__name">${platform.label}</div>
        <div class="platform-row__matches">${platform.matches.join(', ')}</div>
      </div>
    `;
    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '10px';

    if (!granted) {
      const grantBtn = document.createElement('button');
      grantBtn.className = 'grant-btn';
      grantBtn.textContent = 'Grant access';
      grantBtn.onclick = async () => {
        // chrome.permissions.request() must run directly inside a foreground
        // page's click handler to count as a user gesture -- calling it via
        // a message to the (often-inactive) service worker silently no-ops.
        let g = false;
        try {
          g = await chrome.permissions.request({ origins: platform.matches });
        } catch (err) {
          console.error('permissions.request failed', err);
          alert('Could not request permission: ' + err.message);
        }
        if (g) {
          await chrome.runtime.sendMessage({ kind: 'refresh-content-scripts' });
          renderPlatforms();
        }
      };
      right.appendChild(grantBtn);
    }

    const label = document.createElement('label');
    label.className = 'switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = platform.enabled;
    input.onchange = () => { platform.enabled = input.checked; };
    const slider = document.createElement('span');
    slider.className = 'slider';
    label.appendChild(input);
    label.appendChild(slider);
    right.appendChild(label);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      if (!confirm(`Remove ${platform.label} from the monitored sites list?`)) return;
      platforms = platforms.filter((p) => p.id !== platform.id);
      removedOrigins.push(...platform.matches);
      renderPlatforms();
    };
    right.appendChild(removeBtn);

    row.appendChild(right);
    els.platformList.appendChild(row);
  }
}

function buildMatchPattern(rawInput) {
  let val = rawInput.trim();

  // If the user pasted a full pattern/URL already, just make sure it ends
  // in a path wildcard and hand it back as-is.
  if (val.startsWith('http://') || val.startsWith('https://')) {
    return val.endsWith('/*') ? val : val.replace(/\/+$/, '') + '/*';
  }

  // Chrome match-pattern hosts only allow a wildcard as the WHOLE leftmost
  // label followed by a dot ("*.example.com"), never glued onto a label
  // ("*example.com" is invalid). Normalize common typos into that shape,
  // or drop the star entirely for an exact-host match.
  if (val.includes('*')) {
    if (/^\*\.[^*]+$/.test(val)) {
      // already valid: *.example.com
    } else if (/^\*[^.*]/.test(val)) {
      // "*example.com" -> "example.com" (exact host; safer default than guessing subdomains)
      val = val.replace(/^\*+/, '');
    } else {
      val = val.replace(/\*/g, '').replace(/^\.+/, '');
    }
  }

  return `https://${val}/*`;
}

els.addDomainBtn.addEventListener('click', () => {
  const val = els.customDomain.value.trim();
  if (!val) return;
  const pattern = buildMatchPattern(val);
  const id = 'custom-' + val.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  platforms.push({ id, label: val, matches: [pattern], enabled: true });
  els.customDomain.value = '';
  renderPlatforms();
});

async function save() {
  els.saveStatus.textContent = 'Saving\u2026';
  await chrome.runtime.sendMessage({
    kind: 'update-settings',
    settings: {
      localLogging: {
        enabled: els.localEnabled.checked,
        maxEntries: Number(els.maxEntries.value) || 20000,
        retentionDays: Number(els.retentionDays.value) || 0,
      },
      logSamples: els.logSamples.checked,
      logIssues: els.logIssues.checked,
      clientMonitor: {
        collectingPeriodInMs: Number(els.collectingPeriod.value) || 2000,
        samplingPeriodInMs: Number(els.samplingPeriod.value) || 4000,
      },
    },
  });

  // Revoke permissions for any domains removed since the last save. Only
  // matters for optional grants (custom domains) -- default platforms'
  // permissions are declared in manifest.json's host_permissions, so
  // Chrome silently keeps those regardless of this call.
  if (removedOrigins.length) {
    try {
      await chrome.permissions.remove({ origins: removedOrigins });
    } catch (err) {
      console.error('permissions.remove failed for', removedOrigins, err);
    }
    removedOrigins = [];
  }

  // Grant permissions for any newly-added custom domains before registering.
  // Must be called directly here (foreground page, inside the Save click
  // handler) -- see the note in the grantBtn handler above.
  for (const platform of platforms) {
    if (platform.id.startsWith('custom-')) {
      const granted = await chrome.permissions.contains({ origins: platform.matches }).catch(() => false);
      if (!granted) {
        try {
          await chrome.permissions.request({ origins: platform.matches });
        } catch (err) {
          console.error('permissions.request failed for', platform.matches, err);
        }
      }
    }
  }

  await chrome.runtime.sendMessage({ kind: 'update-platforms', platforms });
  els.saveStatus.textContent = 'All changes saved';
  renderPlatforms();
}

els.saveBtn.addEventListener('click', save);

load();
