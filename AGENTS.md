# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `fedimint-guardian`.** One subcontainer, `fedimintd-sub`, built from the local `Dockerfile` (image id `fedimintd`); it exposes a single `ui` interface (the Guardian Dashboard) on port 8175.
- **Bitcoin backend is user-chosen and optional.** The "Bitcoin Configuration" action writes `store.json` (`fileModels/store.ts`) selecting either a local **bitcoind** dependency or an external **Esplora** URL; `dependencies.ts` only declares the bitcoind dependency when that backend is selected.
- **Reaching bitcoind goes through the LXC bridge**, not `.startos` DNS. `utils.ts` `bitcoindRpcUrl` resolves bitcoind's RPC URL via `sdk.host.get(effects, { hostId, packageId: 'bitcoind' }, mapFn)`, importing bitcoind's `rpcHostId`/`rpcInterfaceId` from `bitcoin-core-startos/startos/utils` (a declared dependency) rather than hardcoding. The cookie is still read from the `/mnt/bitcoin` dependency mount inside the subcontainer's rootfs.
- **`store.ts` builds zod schemas directly (`import { z } from 'zod'`) and passes them to `FileHelper.json`.** The package's `node_modules/zod` must be the **same version the SDK bundles** (start-sdk 2.0 uses zod `4.4.3`); a mismatched zod makes `FileHelper.json` reject the schema (and can send tsc into an infinite type instantiation / OOM). This and `fedimint-gateway-startos` are the only packages that import zod directly.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach fedimint-guardian -n fedimintd -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `fedimintd-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
