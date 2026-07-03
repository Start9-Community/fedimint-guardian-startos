import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_11_1_1 = VersionInfo.of({
  version: '0.11.1:2',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 2.0.x)',
    es_ES: 'Actualizaciones internas (start-sdk 2.0.x)',
    de_DE: 'Interne Aktualisierungen (start-sdk 2.0.x)',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 2.0.x)',
    fr_FR: 'Mises à jour internes (start-sdk 2.0.x)',
  },
  migrations: {
    // No StartOS-side migration required for 0.10 → 0.11:
    // - The on-disk db schema bump (redb v2 → v3) is migrated automatically
    //   by fedimintd on first launch.
    // - The package's own store.json schema (bitcoinBackend) is unchanged.
    // - Breaking changes in the 0.11 release notes target the gateway,
    //   gateway-cli, and downstream Rust API consumers — none of which this
    //   guardian package depends on.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
