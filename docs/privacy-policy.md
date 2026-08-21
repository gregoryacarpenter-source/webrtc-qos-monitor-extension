# Privacy Policy — WebRTC QoS Monitor

**Effective date:** August 20, 2026
**Developer:** Greg Carpenter
**Contact:** gregoryacarpenter@gmail.com

## Summary

WebRTC QoS Monitor is a Chrome extension that measures WebRTC call quality
(bitrate, jitter, packet loss, round-trip time, codec, ICE connectivity,
freeze/desync detection, and similar connection statistics) on video/voice
calling sites you explicitly enable. **All data stays on your device.** The
extension does not operate a server, does not transmit any data off the
browser, and does not use analytics, tracking, or advertising services of
any kind.

## What data is collected

While monitoring is active on a site you've enabled, the extension reads
`RTCPeerConnection.getStats()` output for that page's WebRTC connections and
derives:

- Periodic connection-quality samples (bitrate, jitter, packet loss, RTT,
  codec, resolution/frame-rate, ICE candidate/connectivity state, etc.)
- Detected quality issues (e.g., freezes, audio desync, congestion)
- Composite, MOS-like quality scores
- The hostname of the page the data came from, the browser tab ID, and a
  timestamp

To group these records, the extension also generates two identifiers
locally on your device, using `crypto.randomUUID()`:

- An **install ID**, created once per installation and reused across
  sessions
- A **call/session ID**, created per browser tab per call

Neither identifier is derived from your name, account, email address, or
any other personal information, and neither is ever sent anywhere — they
exist only to relate stored records to each other within your local data.

## What the extension never collects

- Audio, video, or screen-share media content — only connection statistics
  produced by `getStats()`
- Page content, DOM data, keystrokes, or form input
- Browsing history outside the specific sites you've enabled
- Account credentials, names, email addresses, or other personal/contact
  information
- Location, financial, or health information

## Where data is stored

All collected records are written to **IndexedDB inside the extension**,
entirely within your browser. There is no remote server and no remote
logging capability in the extension. You control retention:

- A configurable maximum entry count (oldest records pruned first)
- A configurable retention period in days, enforced by an hourly cleanup
- A one-click **Export JSON** action (via the `downloads` permission) to
  save your local data to a file of your choosing
- A one-click **Clear local logs** action to delete everything immediately

Nothing is shared with, sold to, or transmitted to any third party.

## Permissions this extension requests, and why

| Permission | Purpose |
|---|---|
| `storage` | Save your settings and monitored-site list locally (`chrome.storage.local`) |
| `scripting` | Register the stats-collection scripts on sites you've enabled |
| `alarms` | Run the periodic local-storage retention cleanup |
| `downloads` | Save an exported JSON file when you click **Export JSON** |
| `host_permissions` (Microsoft Teams, Talkdesk, Amazon Connect, Webex, Zoom) | Declared so monitoring can run on these known WebRTC calling platforms — each one is **disabled by default** and only takes effect once you explicitly turn it on in Settings |
| `optional_host_permissions` (`https://*/*`) | Lets you add a custom domain in Settings; access to any specific site is only requested — and only granted — when you add that domain yourself, and can be revoked at any time with the **Remove** button |

## Children's privacy

This extension is not directed at children under 13 and does not knowingly
collect information from children.

## Changes to this policy

If this policy changes, the updated version will be published at this same
location with a revised effective date.

## Contact

Questions about this policy or the extension's data handling can be sent to
**gregoryacarpenter@gmail.com**.
