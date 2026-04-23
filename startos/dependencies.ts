import { storeJson } from './fileModels/store'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const backendType = await storeJson
    .read((s) => s.bitcoinBackend?.type)
    .const(effects)

  if (backendType === 'bitcoind') {
    return {
      bitcoind: {
        kind: 'running',
        versionRange: '>=28.3:7',
        healthChecks: ['bitcoind', 'sync-progress'],
      },
    }
  }

  return {}
})
