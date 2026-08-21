# WebRTC QoS Monitor (Chrome Extension)

A Manifest V3 extension that uses [`@observertc/client-monitor-js`](https://github.com/ObserveRTC/client-monitor-js)
to collect WebRTC quality-of-service stats (bitrate, jitter, packet loss, RTT,
codec, ICE connectivity, freeze/desync detection, etc.) from calls happening
inside the browser. Everything is logged locally, in the browser — nothing
ever leaves the machine.

**It reads `RTCPeerConnection.getStats()` output only — never microphone,
camera, or screen-share media content.**

## How it captures traffic

Apps like Teams, Zoom, Webex, Talkdesk, and Amazon Connect create their own
`RTCPeerConnection` objects deep inside their own JS bundles — there's no
page-provided hook for an extension to tap into normally. This extension
solves that by:

1. Injecting `dist/inject.bundle.js` into the page's **MAIN** world (the
   page's own JS realm, via `chrome.scripting.registerContentScripts` with
   `world: "MAIN"`), where it transparently wraps `window.RTCPeerConnection`.
2. Every `RTCPeerConnection` the host page creates gets added as a source to
   a `ClientMonitor` instance (`monitor.addSource(pc)`), which polls
   `getStats()` on an interval and emits standardized samples/issues.
3. Samples/issues are relayed via `window.postMessage` to `content-bridge.js`,
   which runs in the extension's isolated content-script world on the same
   page, and forwarded to the background service worker.
4. The service worker writes events to IndexedDB for local logging.

## Project layout

```
manifest.json          MV3 manifest — permissions, host list, service worker
background.js           Service worker: registers per-platform content
                         scripts, session IDs, local log pipeline
content-bridge.js       Isolated-world relay between page and background
src/inject-source.js    MAIN-world source (hooks RTCPeerConnection + ClientMonitor)
dist/inject.bundle.js   Bundled build of the above (run `npm run build`)
src/config.js           Default platform list + settings schema/storage helpers
src/db.js               IndexedDB wrapper for local event storage
popup.html/js           Toolbar popup: on/off, counts, export/clear
options.html/js         Settings: platforms, local retention
icons/                  Toolbar icon
```

## Building

```bash
npm install
npm run build      # bundles src/inject-source.js -> dist/inject.bundle.js
```

Re-run `npm run build` any time you edit `src/inject-source.js`.

## Loading the extension

1. `npm install && npm run build`
2. Visit `chrome://extensions`, enable **Developer mode**.
3. **Load unpacked** → select this folder.
4. Click the toolbar icon → **Open settings** to review platforms and local
   retention.

## Default monitored platforms

Predefined in `src/config.js` (`DEFAULT_PLATFORMS`), listed in the options
page but **disabled by default** — each one must be individually switched on
before the extension will monitor it:

| Platform | Match patterns |
|---|---|
| Microsoft Teams | `teams.microsoft.com`, `*.teams.microsoft.com`, `teams.live.com` |
| Talkdesk | `*.talkdeskapp.com`, `*.mytalkdesk.com` |
| Amazon Connect (CCP) | `*.awsapps.com`, `*.my.connect.aws` |
| Webex | `*.webex.com` |
| Zoom (web client) | `*.zoom.us` |

Amazon Connect CCPs and some Talkdesk deployments live on customer-specific
subdomains — add any missing one from **Settings → Platforms → Add another
domain**. You'll be prompted to grant that site permission (uses the
`optional_host_permissions` + `chrome.permissions.request` flow, so the
extension doesn't need blanket `<all_urls>` access up front).

## Local logging

Events are stored in IndexedDB inside the extension, with a max-entry cap
and a retention-days prune (an alarm sweeps hourly). Exportable as JSON
from the popup. Nothing is ever sent off the machine.

## Sample record shape

```json
{
  "type": "sample",
  "platformHostname": "teams.microsoft.com",
  "session": { "clientId": "…uuid…", "callId": "123-172…-ab12cd" },
  "tabId": 42,
  "ts": 1755440000000,
  "payload": { "sample": { /* ObserveRTC ClientSample schema */ } }
}
```

`type` is one of `sample` (periodic stats), `issue` (detected quality
problem — freeze, desync, congestion, etc.), `score` (composite MOS-like
score), or `error` (hook/telemetry failure).

## Notes / next steps for production hardening

- This is a working scaffold, not a signed/store-ready package — review
  `content_security_policy`, consider pinning `optional_host_permissions`
  down from `https://*/*` if you don't need arbitrary custom domains.
- If deploying via Chrome Enterprise policy, you can pre-set
  `host_permissions`/force-install and skip the `optional_host_permissions`
  request flow entirely.
