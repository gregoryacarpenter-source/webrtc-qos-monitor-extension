import { getSettings, setSettings, getPlatforms, setPlatforms, DEFAULT_PLATFORMS } from './src/config.js';
import { addEvent, countAll, pruneOlderThan, pruneToMax, exportAll, clearAll } from './src/db.js';

const SCRIPT_ID_PREFIX = 'webrtc-qos-';
const PRUNE_ALARM = 'webrtc-qos-prune';

// ---------- setup ----------

chrome.runtime.onInstalled.addListener(async () => {
  const platforms = await getPlatforms();
  await setPlatforms(platforms); // persist defaults on first run
  await registerAllContentScripts();
  chrome.alarms.create(PRUNE_ALARM, { periodInMinutes: 60 });
});

chrome.runtime.onStartup.addListener(async () => {
  await registerAllContentScripts();
});

async function registerAllContentScripts() {
  const platforms = await getPlatforms();
  const existing = await chrome.scripting.getRegisteredContentScripts();
  const existingIds = existing.map((s) => s.id);
  if (existingIds.length) {
    await chrome.scripting.unregisterContentScripts({ ids: existingIds });
  }

  const toRegister = [];
  for (const platform of platforms) {
    if (!platform.enabled || !platform.matches?.length) continue;
    // Only register on domains we actually hold permission for -- avoids
    // silent no-ops and lets the options page surface a clear "grant access" step.
    const granted = await chrome.permissions.contains({ origins: platform.matches }).catch(() => false);
    if (!granted) continue;

    toRegister.push({
      id: `${SCRIPT_ID_PREFIX}bridge-${platform.id}`,
      js: ['content-bridge.js'],
      matches: platform.matches,
      runAt: 'document_start',
      world: 'ISOLATED',
    });
    toRegister.push({
      id: `${SCRIPT_ID_PREFIX}inject-${platform.id}`,
      js: ['dist/inject.bundle.js'],
      matches: platform.matches,
      runAt: 'document_start',
      world: 'MAIN',
    });
  }

  if (toRegister.length) {
    await chrome.scripting.registerContentScripts(toRegister);
  }
}

// ---------- per-tab session identity ----------

const tabSessions = new Map(); // tabId -> { clientId, callId }

async function getStableClientId() {
  const { installClientId } = await chrome.storage.local.get('installClientId');
  if (installClientId) return installClientId;
  const id = crypto.randomUUID();
  await chrome.storage.local.set({ installClientId: id });
  return id;
}

async function getSessionForTab(tabId) {
  if (tabSessions.has(tabId)) return tabSessions.get(tabId);
  const clientId = await getStableClientId();
  const session = { clientId, callId: `${tabId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  tabSessions.set(tabId, session);
  return session;
}

chrome.tabs.onRemoved.addListener((tabId) => tabSessions.delete(tabId));

// ---------- messaging from content-bridge.js ----------

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.kind) return;

  if (msg.kind === 'get-page-config') {
    (async () => {
      const settings = await getSettings();
      const platforms = await getPlatforms();
      const platform = platforms.find((p) => matchesHostname(p, msg.hostname));
      const enabled = settings.monitoringEnabled && (!platform || platform.enabled);
      const session = sender.tab ? await getSessionForTab(sender.tab.id) : { clientId: await getStableClientId(), callId: `unknown-${Date.now()}` };
      sendResponse({ enabled, session, clientMonitor: settings.clientMonitor });
    })();
    return true; // async response
  }

  if (msg.kind === 'monitor-event') {
    handleMonitorEvent(msg, sender).then(() => sendResponse({ ok: true })).catch((err) => sendResponse({ ok: false, error: String(err) }));
    return true;
  }

  if (msg.kind === 'get-status') {
    (async () => {
      const settings = await getSettings();
      const total = await countAll();
      sendResponse({ settings, totalLocalEvents: total });
    })();
    return true;
  }

  if (msg.kind === 'update-settings') {
    (async () => {
      const settings = await setSettings(msg.settings);
      await broadcastSettingsChanged();
      sendResponse({ settings });
    })();
    return true;
  }

  if (msg.kind === 'update-platforms') {
    (async () => {
      const platforms = await setPlatforms(msg.platforms);
      await registerAllContentScripts();
      await broadcastSettingsChanged();
      sendResponse({ platforms });
    })();
    return true;
  }

  if (msg.kind === 'get-platforms') {
    (async () => sendResponse({ platforms: await getPlatforms() }))();
    return true;
  }

  if (msg.kind === 'refresh-content-scripts') {
    // Called after options.js has already obtained a permission grant
    // directly (chrome.permissions.request must run in a foreground page,
    // not here) -- just re-register scripts against the newly granted origin.
    (async () => { await registerAllContentScripts(); sendResponse({ ok: true }); })();
    return true;
  }

  if (msg.kind === 'export-logs') {
    (async () => sendResponse({ events: await exportAll() }))();
    return true;
  }

  if (msg.kind === 'clear-logs') {
    (async () => { await clearAll(); sendResponse({ ok: true }); })();
    return true;
  }
});

function matchesHostname(platform, hostname) {
  return (platform.matches || []).some((pattern) => {
    // crude host-only check for UI purposes; chrome.scripting match rules do the real enforcement
    const host = pattern.replace(/^https?:\/\//, '').replace(/\/.*/, '');
    const re = new RegExp('^' + host.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
    return re.test(hostname);
  });
}

async function broadcastSettingsChanged() {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.id != null) {
      chrome.tabs.sendMessage(tab.id, { kind: 'settings-changed' }).catch(() => {});
    }
  }
}

// ---------- event ingestion ----------

async function handleMonitorEvent(msg, sender) {
  const settings = await getSettings();
  if (!settings.monitoringEnabled) return;
  if (msg.type === 'sample' && !settings.logSamples) return;
  if (msg.type === 'issue' && !settings.logIssues) return;

  const record = {
    type: msg.type,
    payload: msg.payload,
    platformHostname: msg.platformHostname,
    session: msg.session,
    tabId: sender.tab ? sender.tab.id : null,
    ts: Date.now(),
  };

  if (settings.localLogging.enabled) {
    await addEvent(record);
    await pruneToMax(settings.localLogging.maxEntries);
  }
}

// ---------- pruning ----------

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === PRUNE_ALARM) {
    const settings = await getSettings();
    if (settings.localLogging.retentionDays > 0) {
      const cutoff = Date.now() - settings.localLogging.retentionDays * 86400000;
      await pruneOlderThan(cutoff);
    }
  }
});
