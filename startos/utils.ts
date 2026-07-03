import { T } from '@start9labs/start-sdk'
import {
  rpcHostId as btcRpcHostId,
  rpcInterfaceId as btcRpcInterfaceId,
} from 'bitcoin-core-startos/startos/utils'
import { sdk } from './sdk'

export const uiPort = 8175

/**
 * bitcoind's RPC URL over the LXC bridge (replaces the static
 * `http://bitcoind.startos:8332`). The map fn returns only the resolved URL so
 * `.const()` re-fires only when the address changes; `null` when bitcoind isn't
 * yet reachable on the internal network.
 */
export const bitcoindRpcUrl = (effects: T.Effects) =>
  sdk.host
    .get(effects, { hostId: btcRpcHostId, packageId: 'bitcoind' }, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === btcRpcInterfaceId)
      const rpc = iface?.addressInfo
        .filter({
          kind: 'bridge',
          predicate: (h) => !h.ssl && h.metadata.kind === 'ipv4',
        })
        .hostnames[0]
      return rpc ? `http://${rpc.hostname}:${rpc.port}` : null
    })
    .const()
