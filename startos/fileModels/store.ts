import { FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { z } from 'zod'

const bitcoindVariant = z.object({
  type: z.literal('bitcoind').catch('bitcoind' as const),
})

const esploraVariant = z.object({
  type: z.literal('esplora').catch('esplora' as const),
  url: z.string().catch('https://mempool.space/api'),
})

// Intentionally no `.catch` default: the backend stays undefined until the
// user explicitly opts in via the Configuration action. This prevents
// bitcoind from showing as a dependency before the user has chosen it.
const bitcoinBackend = z
  .discriminatedUnion('type', [bitcoindVariant, esploraVariant])
  .optional()

// Intentionally no `.catch` default: the password is seeded exactly once in
// init (carried over from a pre-0.12 `password.private` if present, otherwise
// freshly generated) and must never be silently regenerated afterwards —
// guardians rely on it staying stable.
const guardianPassword = z.string().optional()

const shape = z.object({
  bitcoinBackend,
  guardianPassword,
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: './store.json' },
  shape,
)
