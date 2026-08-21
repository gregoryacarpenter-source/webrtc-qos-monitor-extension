// Runs in the PAGE's own JS context ("MAIN" world) so it can see the real
// window.RTCPeerConnection that Teams/Zoom/Webex/Talkdesk/Connect create.
// It never touches media itself -- only RTCPeerConnection.getStats() output
// (bitrate, jitter, packet loss, RTT, codec, ICE state, etc.), which is what
// client-monitor-js consumes.

import { ClientMonitor } from '@observertc/client-monitor-js';

const CHANNEL = '__webrtc_qos_monitor__';
const NativeRTCPeerConnection = window.RTCPeerConnection;

let monitor = null;
let enabled = false;
let clientId = null;
let callId = null;
let hooked = false;
const trackedConnections = new Set();

function post(type, payload) {
  window.postMessage({ channel: CHANNEL, direction: 'to-content', type, payload }, window.location.origin);
}

function ensureMonitor() {
  if (monitor) return monitor;
  monitor = new ClientMonitor({
    clientId,
    callId,
    collectingPeriodInMs: (window.__webrtcQosConfig && window.__webrtcQosConfig.collectingPeriodInMs) || 2000,
    samplingPeriodInMs: (window.__webrtcQosConfig && window.__webrtcQosConfig.samplingPeriodInMs) || 4000,
  });

  monitor.on('sample-created', ({ sample }) => {
    post('sample', { sample, href: location.href, hostname: location.hostname, ts: Date.now() });
  });

  monitor.on('issue', (issue) => {
    post('issue', { issue, href: location.href, hostname: location.hostname, ts: Date.now() });
  });

  monitor.on('score', ({ clientScore, currentReasons }) => {
    post('score', { clientScore, currentReasons, ts: Date.now() });
  });

  return monitor;
}

function trackConnection(pc) {
  if (!enabled || trackedConnections.has(pc)) return;
  trackedConnections.add(pc);
  const m = ensureMonitor();
  try {
    m.addSource(pc);
  } catch (err) {
    post('error', { message: 'addSource failed: ' + String(err && err.message), ts: Date.now() });
  }
  const cleanup = () => {
    trackedConnections.delete(pc);
    try { m.removeSource(pc); } catch (_e) { /* noop */ }
  };
  pc.addEventListener('connectionstatechange', () => {
    if (pc.connectionState === 'closed' || pc.connectionState === 'failed') cleanup();
  });
}

function installHook() {
  if (hooked) return;
  hooked = true;

  function WrappedRTCPeerConnection(...args) {
    const pc = new NativeRTCPeerConnection(...args);
    try {
      trackConnection(pc);
    } catch (err) {
      post('error', { message: 'hook failed: ' + String(err && err.message), ts: Date.now() });
    }
    return pc;
  }
  WrappedRTCPeerConnection.prototype = NativeRTCPeerConnection.prototype;
  Object.setPrototypeOf(WrappedRTCPeerConnection, NativeRTCPeerConnection);
  try {
    window.RTCPeerConnection = WrappedRTCPeerConnection;
  } catch (err) {
    post('error', { message: 'could not override RTCPeerConnection: ' + String(err && err.message), ts: Date.now() });
  }
}

window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  const data = event.data;
  if (!data || data.channel !== CHANNEL || data.direction !== 'to-page') return;

  if (data.type === 'init' || data.type === 'update-config') {
    enabled = !!data.payload.enabled;
    clientId = data.payload.clientId || clientId;
    callId = data.payload.callId || callId;
    window.__webrtcQosConfig = data.payload.clientMonitor || window.__webrtcQosConfig;
    if (enabled) installHook();
    if (!enabled && monitor) {
      // keep hook installed (cheap) but stop emitting: close current monitor,
      // a fresh one is created lazily if re-enabled.
      monitor.close();
      monitor = null;
      trackedConnections.clear();
    }
  }
});

// Announce readiness so the isolated content script can send initial config.
post('ready', { href: location.href, hostname: location.hostname });

window.addEventListener('pagehide', () => {
  if (monitor) {
    try { monitor.close(); } catch (_e) { /* noop */ }
  }
});
