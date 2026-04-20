import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fedimintd',
  title: 'Fedimint',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/fedimint-startos',
  upstreamRepo: 'https://github.com/fedimint/fedimint',
  marketingUrl: 'https://fedimint.org/',
  donationUrl: null,
  docsUrls: ['https://fedimint.org'],
  description: { short, long },
  volumes: ['main', 'fedimintd'],
  images: {
    fedimintd: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description:
        'Provides private, self-hosted blockchain data instead of relying on external Esplora APIs',
      optional: true,
      metadata: {
        title: 'Bitcoin Core',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/feec0b1dae42961a257948fe39b40caf8672fce1/dep-icon.svg',
      },
    },
  },
})
