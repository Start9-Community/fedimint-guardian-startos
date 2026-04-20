import { FileHelper } from '@start9labs/start-sdk'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { storeJson } from './fileModels/store'
import { DEFAULT_RUST_LOG, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Fedimint!'))

  const store = await storeJson.read().const(effects)

  if (!store?.bitcoinBackend) {
    throw new Error(
      'Bitcoin backend is not configured — run the Configuration task',
    )
  }

  const bitcoinBackend = store.bitcoinBackend
  const rustLog = store.rustLog ?? DEFAULT_RUST_LOG

  const env: Record<string, string> = {
    FM_DATA_DIR: '/fedimintd',
    FM_BITCOIN_NETWORK: 'bitcoin',
    FM_BIND_UI: `0.0.0.0:${uiPort}`,
    FM_ENABLE_IROH: 'true',
    RUST_LOG: rustLog,
    // Disable Arti's fs-mistrust permission checks. These invoke
    // getpwuid/getpwnam via libc, which reads /etc/passwd. The Dockerfile
    // materializes the upstream's /etc/passwd symlink, but this is a
    // defense-in-depth in case SubContainer layer extraction ever misses
    // the materialized file.
    FS_MISTRUST_DISABLE_PERMISSIONS_CHECKS: 'true',
  }

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/start-os',
      readonly: false,
    })
    .mountVolume({
      volumeId: 'fedimintd',
      subpath: null,
      mountpoint: '/fedimintd',
      readonly: false,
    })

  if (bitcoinBackend.type === 'bitcoind') {
    mounts.mountDependency({
      dependencyId: 'bitcoind',
      volumeId: 'main',
      subpath: null,
      mountpoint: '/mnt/bitcoin',
      readonly: true,
    })
    env.FM_BITCOIND_URL = 'http://bitcoind.startos:8332'
    env.FM_BITCOIND_COOKIE_FILE = '/mnt/bitcoin/.cookie'
  } else {
    env.FM_ESPLORA_URL = bitcoinBackend.url
  }

  const fedimintdSubc = await sdk.SubContainer.of(
    effects,
    { imageId: 'fedimintd' },
    mounts,
    'fedimintd-sub',
  )

  // Restart if Bitcoin cookie changes
  if (bitcoinBackend.type === 'bitcoind') {
    await FileHelper.string(`${fedimintdSubc.rootfs}/mnt/bitcoin/.cookie`)
      .read()
      .const(effects)
  }

  return sdk.Daemons.of(effects).addDaemon('fedimintd', {
    subcontainer: fedimintdSubc,
    exec: {
      command: ['fedimintd', '--data-dir', '/fedimintd/'],
      env,
    },
    ready: {
      display: i18n('Guardian Dashboard'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The guardian dashboard is ready'),
          errorMessage: i18n('The guardian dashboard is not ready'),
        }),
    },
    requires: [],
  })
})
