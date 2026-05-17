import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v_0_11_1_1 = VersionInfo.of({
  version: '0.11.1:1',
  releaseNotes: {
    en_US: `**Bumps**

- Fedimint Guardian → 0.11.1 (gateway recovery + mnemonic management, Pkarr-based guardian discovery, modernized setup/dashboard UI, lower memory usage, expanded Prometheus metrics)
- start-sdk → 1.5.2

**Notes**

- Existing federations: fedimintd performs the redb v2 → v3 database migration in place on first launch; no guardian action required. Federation config and consensus state are preserved.`,
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
