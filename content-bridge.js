// Runs in the extension's isolated content-script world on matched pages.
// Relays messages between the injected page-context monitor (inject.bundle.js,
// "world": "MAIN") and the background service worker.

const CHANNEL = '__webrtc_qos_monitor__';
let sessionIds = null; // { clientId, callId } assigned once per tab load

function toPage(type, payload) {
  window.postMessage({ channel: CHANNEL, direction: 'to-page', type, payload }, window.location.origin);
}

async function sendConfig() {
  const resp = await chrome.runtime.sendMessage({ kind: 'get-page-config', hostname: location.hostname });
  if (!resp) return;
  sessionIds = resp.session;
  toPage('init', {
    enabled: resp.enabled,
    clientId: resp.session.clientId,
    callId: resp.session.callId,
    clientMonitor: resp.clientMonitor,
  });
}

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  const data = event.data;
  if (!data || data.channel !== CHANNEL || data.direction !== 'to-content') return;

  if (data.type === 'ready') {
    sendConfig();
    return;
  }
  if (data.type === 'sample' || data.type === 'issue' || data.type === 'score' || data.type === 'error') {
    chrome.runtime.sendMessage({
      kind: 'monitor-event',
      type: data.type,
      payload: data.payload,
      platformHostname: location.hostname,
      session: sessionIds,
    }).catch(() => { /* background may be waking up; drop is acceptable for a single event */ });
  }
});

// Background can push live enable/disable toggles without a page reload.
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.kind === 'settings-changed') {
    sendConfig();
  }
});
