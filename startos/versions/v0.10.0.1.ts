import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_10_0_1 = VersionInfo.of({
  version: '0.10.0:1',
  releaseNotes: {
    en_US: 'Initial release of Fedimint v0.10.0 for StartOS',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
