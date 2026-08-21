const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const monitoringToggle = document.getElementById('monitoringToggle');
const localCount = document.getElementById('localCount');
const currentPlatform = document.getElementById('currentPlatform');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const openOptions = document.getElementById('openOptions');

async function refresh() {
  const { settings, totalLocalEvents } = await chrome.runtime.sendMessage({ kind: 'get-status' });
  monitoringToggle.checked = settings.monitoringEnabled;
  statusDot.className = 'dot ' + (settings.monitoringEnabled ? 'dot--on' : 'dot--off');
  statusText.textContent = settings.monitoringEnabled ? 'Monitoring active' : 'Monitoring paused';
  localCount.textContent = totalLocalEvents.toLocaleString();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    try {
      const hostname = new URL(tab.url).hostname;
      const { platforms } = await chrome.runtime.sendMessage({ kind: 'get-platforms' });
      const match = platforms.find((p) => (p.matches || []).some((m) => hostToRegex(m).test(hostname)));
      currentPlatform.textContent = match ? match.label : hostname;
    } catch (_e) {
      currentPlatform.textContent = 'n/a';
    }
  }
}

function hostToRegex(pattern) {
  const host = pattern.replace(/^https?:\/\//, '').replace(/\/.*/, '');
  return new RegExp('^' + host.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
}

monitoringToggle.addEventListener('change', async () => {
  await chrome.runtime.sendMessage({ kind: 'update-settings', settings: { monitoringEnabled: monitoringToggle.checked } });
  refresh();
});

exportBtn.addEventListener('click', async () => {
  const { events } = await chrome.runtime.sendMessage({ kind: 'export-logs' });
  const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: `webrtc-qos-log-${Date.now()}.json`, saveAs: true });
});

clearBtn.addEventListener('click', async () => {
  if (!confirm('Clear all locally stored WebRTC QoS events?')) return;
  await chrome.runtime.sendMessage({ kind: 'clear-logs' });
  refresh();
});

openOptions.addEventListener('click', () => chrome.runtime.openOptionsPage());

refresh();
