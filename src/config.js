// Shared defaults + storage helpers used by background, popup, and options pages.

export const DEFAULT_PLATFORMS = [
  { id: 'teams', label: 'Microsoft Teams', matches: ['https://teams.microsoft.com/*', 'https://*.teams.microsoft.com/*', 'https://teams.live.com/*'], enabled: false },
  { id: 'talkdesk', label: 'Talkdesk', matches: ['https://*.talkdeskapp.com/*', 'https://*.mytalkdesk.com/*'], enabled: false },
  { id: 'amazon-connect', label: 'Amazon Connect (CCP)', matches: ['https://*.awsapps.com/*', 'https://*.my.connect.aws/*'], enabled: false },
  { id: 'webex', label: 'Webex', matches: ['https://*.webex.com/*'], enabled: false },
  { id: 'zoom', label: 'Zoom (web client)', matches: ['https://*.zoom.us/*'], enabled: false },
];

export const DEFAULT_SETTINGS = {
  monitoringEnabled: true,
  localLogging: {
    enabled: true,
    maxEntries: 20000, // ring buffer cap in IndexedDB
    retentionDays: 14,
  },
  clientMonitor: {
    collectingPeriodInMs: 2000,
    samplingPeriodInMs: 4000,
  },
  logIssues: true,
  logSamples: true,
};

export async function getSettings() {
  const { settings } = await chrome.storage.local.get('settings');
  return settings ? mergeDeep(DEFAULT_SETTINGS, settings) : structuredClone(DEFAULT_SETTINGS);
}

export async function setSettings(partial) {
  const current = await getSettings();
  const next = mergeDeep(current, partial);
  await chrome.storage.local.set({ settings: next });
  return next;
}

export async function getPlatforms() {
  const { platforms } = await chrome.storage.local.get('platforms');
  return platforms && platforms.length ? platforms : structuredClone(DEFAULT_PLATFORMS);
}

export async function setPlatforms(platforms) {
  await chrome.storage.local.set({ platforms });
  return platforms;
}

function mergeDeep(base, override) {
  const out = structuredClone(base);
  for (const key of Object.keys(override || {})) {
    const bv = out[key];
    const ov = override[key];
    if (bv && typeof bv === 'object' && !Array.isArray(bv) && ov && typeof ov === 'object' && !Array.isArray(ov)) {
      out[key] = mergeDeep(bv, ov);
    } else {
      out[key] = ov;
    }
  }
  return out;
}
