import { IMPOSSIBLE, VersionInfo, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { storeJson } from '../fileModels/store'

const OLD_CONFIG = '/media/startos/volumes/main/start9/config.yaml'
const OLD_START9_DIR = '/media/startos/volumes/main/start9'
const OLD_BACKUPIGNORE = '/media/startos/volumes/fedimintd/.backupignore'

type OldConfig = {
  'fedimintd-bitcoin-backend'?: {
    'backend-type'?: 'bitcoind' | 'esplora'
    url?: string
  }
}

export const v_0_10_0_1 = VersionInfo.of({
  version: '0.10.0:1',
  releaseNotes: {
    en_US:
      'Rewritten on the StartOS SDK. Migrates the bitcoin-backend choice from 0.3.5.1. Bitcoin Core is now authenticated via its cookie file — the old RPC username/password is no longer needed.',
  },
  migrations: {
    up: async ({ effects }) => {
      const oldConfig: OldConfig | undefined = await readFile(
        OLD_CONFIG,
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (oldConfig) {
        const backend = oldConfig['fedimintd-bitcoin-backend']
        const bitcoinBackend =
          backend?.['backend-type'] === 'esplora' && backend.url
            ? { type: 'esplora' as const, url: backend.url }
            : backend?.['backend-type'] === 'bitcoind'
              ? { type: 'bitcoind' as const }
              : undefined

        if (bitcoinBackend) {
          await storeJson.merge(effects, { bitcoinBackend })
        }

        await rm(OLD_START9_DIR, { recursive: true, force: true }).catch(
          console.error,
        )
        await rm(OLD_BACKUPIGNORE, { force: true }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
