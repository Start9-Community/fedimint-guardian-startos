export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Fedimint!': 0,
  'Guardian Dashboard': 1,
  'The guardian dashboard is ready': 2,
  'The guardian dashboard is not ready': 3,
  'Bitcoin backend is not configured — run the Bitcoin Configuration task': 16,
  'Bitcoind cookie is missing': 18,
  'Bitcoind cookie is malformed': 19,
  'Bitcoin is not yet reachable on the internal network': 20,
  'Guardian password has not been set': 21,

  // interfaces.ts
  'Guardian Interface': 4,
  'Initial setup and dashboard for this guardian': 5,

  // actions/configBitcoin.ts
  'Bitcoin Configuration': 6,
  "Configure the Guardian's Bitcoin backend": 7,
  'Bitcoin Backend': 8,
  'Choose how the Guardian connects to the Bitcoin network': 9,
  'Local node (recommended)': 10,
  Esplora: 11,
  'Esplora API URL': 12,
  'The URL of the Esplora API to use': 13,
  'Must be a valid HTTP(S) URL': 14,

  // actions/setGuardianPassword.ts
  'Set Guardian Password': 22,
  'Generate a new password for signing in to the Guardian Dashboard. Running this on a live guardian restarts it to apply the new password.': 23,
  'Guardian Password': 24,
  'Use this password to sign in to the Guardian Dashboard': 25,

  // init/tasksOnInstall.ts
  'Fedimint needs to know which Bitcoin backend to use': 17,
  'The Guardian Dashboard is served without a login until a password is set': 26,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
