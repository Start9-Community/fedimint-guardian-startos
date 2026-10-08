import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'fedimint-guardian',
  title: 'Fedimint Guardian',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/fedimint-guardian-startos',
  upstreamRepo: 'https://github.com/fedimint/fedimint',
  marketingUrl: 'https://fedimint.org/',
  donationUrl: null,
  description: { short, long },
  volumes: ['main', 'fedimintd'],
  images: {
    fedimintd: {
      source: { dockerBuild: {} },
      arch: ['x86_64', 'aarch64'],
      emulateMissing: false,
    },
  },
})
