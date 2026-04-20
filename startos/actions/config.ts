import {
  InputSpec,
  Value,
  Variants,
} from '@start9labs/start-sdk/base/lib/actions/input/builder'
import { sdk } from '../sdk'
import { i18n } from '../i18n'
import { storeJson } from '../fileModels/store'
import { DEFAULT_RUST_LOG } from '../utils'

const inputSpec = InputSpec.of({
  bitcoinBackend: Value.union({
    name: i18n('Bitcoin Backend'),
    description: i18n(
      'Choose how Fedimint connects to the Bitcoin network',
    ),
    default: 'bitcoind',
    variants: Variants.of({
      bitcoind: {
        name: i18n('Bitcoin Core (Recommended)'),
        spec: InputSpec.of({}),
      },
      esplora: {
        name: i18n('Esplora'),
        spec: InputSpec.of({
          url: Value.text({
            name: i18n('Esplora API URL'),
            description: i18n('The URL of the Esplora API to use'),
            required: true,
            default: 'https://mempool.space/api',
            patterns: [
              {
                regex: '^https?://.*',
                description: 'Must be a valid HTTP(S) URL',
              },
            ],
          }),
        }),
      },
    }),
  }),
  advanced: Value.object(
    {
      name: i18n('Advanced Settings'),
    },
    InputSpec.of({
      rustLog: Value.text({
        name: i18n('Rust Log Directives'),
        description: i18n(
          'Rust logging directives. Only modify if debugging.',
        ),
        required: true,
        default: DEFAULT_RUST_LOG,
      }),
    }),
  ),
})

type ConfigInput = typeof inputSpec._TYPE

export const config = sdk.Action.withInput(
  'config',
  async ({ effects }) => ({
    name: i18n('Configuration'),
    description: i18n('Configure Fedimint settings'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled' as const,
  }),
  inputSpec,
  async ({ effects }) => {
    const store = await storeJson.read().once()
    if (!store) return undefined
    return {
      bitcoinBackend:
        store.bitcoinBackend?.type === 'esplora'
          ? {
              selection: 'esplora' as const,
              value: { url: store.bitcoinBackend.url },
            }
          : { selection: 'bitcoind' as const, value: {} },
      advanced: {
        rustLog: store.rustLog,
      },
    }
  },
  async ({ effects, input }) => {
    const bitcoinBackend =
      input.bitcoinBackend.selection === 'esplora'
        ? {
            type: 'esplora' as const,
            url: input.bitcoinBackend.value.url,
          }
        : { type: 'bitcoind' as const }

    await storeJson.merge(effects, {
      bitcoinBackend,
      rustLog: input.advanced.rustLog,
    })
  },
)
