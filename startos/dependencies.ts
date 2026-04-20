import { sdk } from './sdk'
import { storeJson } from './fileModels/store'

export const setDependencies = sdk.setupDependencies(
  async ({ effects }) => {
    const backendType = await storeJson
      .read((s) => s.bitcoinBackend?.type)
      .const(effects)

    if (backendType === 'bitcoind') {
      return {
        bitcoind: {
          kind: 'running' as const,
          versionRange: '>=28.3:5',
          healthChecks: ['bitcoind', 'sync-progress'],
        },
      }
    }

    return {}
  },
)
