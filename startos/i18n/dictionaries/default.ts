export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Fedimint!': 0,
  'Guardian Dashboard': 1,
  'The guardian dashboard is ready': 2,
  'The guardian dashboard is not ready': 3,

  // interfaces.ts
  'Guardian Interface': 4,
  'Initial setup and dashboard for this guardian': 5,

  // actions/config.ts
  'Configuration': 6,
  'Configure Fedimint settings': 7,
  'Bitcoin Backend': 8,
  'Choose how Fedimint connects to the Bitcoin network': 9,
  'Bitcoin Core (Recommended)': 10,
  'Esplora': 11,
  'Esplora API URL': 12,
  'The URL of the Esplora API to use': 13,
  'Rust Log Directives': 14,
  'Rust logging directives. Only modify if debugging.': 15,
  'Advanced Settings': 16,

  // init/tasksOnInstall.ts
  'Fedimint needs to know which Bitcoin backend to use': 17,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
