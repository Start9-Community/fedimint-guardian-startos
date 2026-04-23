import { setupManifest } from '@start9labs/start-sdk'
import { depBitcoindDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fedimint-guardian',
  title: 'Fedimint Guardian',
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
  dependencies: {
    bitcoind: {
      description: depBitcoindDescription,
      optional: true,
      metadata: {
        title: 'Bitcoin',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/feec0b1dae42961a257948fe39b40caf8672fce1/dep-icon.svg',
      },
    },
  },
})
