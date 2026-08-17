<p align="center">
  <img src="icon.png" alt="Fedimint Guardian Logo" width="21%">
</p>

# Fedimint Guardian on StartOS

> Everything not listed in this document should behave the same as upstream
> Fedimint. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

A [Fedimint](https://github.com/fedimint/fedimint) guardian is one of the servers that jointly custody a federation's Bitcoin. This package runs one, lets you point it at your own Bitcoin node or a remote Esplora, and backs its database up in a way that is actually restorable.

- **Upstream repo:** <https://github.com/fedimint/fedimint>
- **Wrapper repo:** <https://github.com/Start9-Community/fedimint-guardian-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One image, built here from upstream source.

| Property      | Value                               |
| ------------- | ----------------------------------- |
| Image         | Built from this repo's `Dockerfile` |
| Architectures | x86_64, aarch64                     |
| Command       | `fedimintd`                         |

| Subcontainer    | Purpose                                  |
| --------------- | ---------------------------------------- |
| `fedimintd-sub` | The only daemon — the one to `attach` to |

Everything the guardian needs is passed as environment; nothing is templated into a config file.

## Volume and Data Layout

Two volumes, plus a conditional view of Bitcoin's.

| Volume                | Mount Point    | Purpose                                           |
| --------------------- | -------------- | ------------------------------------------------- |
| `main`                | —              | The package store                                 |
| `fedimintd`           | `/fedimintd`   | The guardian's database and its checkpoints       |
| Bitcoin's `main` (ro) | `/mnt/bitcoin` | The RPC cookie — **only** when using a local node |

The Bitcoin mount is added only when a local node is selected, so a guardian running against Esplora mounts nothing.

`/fedimintd` holds two things that matter to a restore: the **live database**, and a directory of **database checkpoints** the guardian writes itself. The distinction is what makes this package's backup work — see [Backups and Restore](#backups-and-restore).

## File Models

One model, holding one choice.

| File         | Format | Modelled                | Written by          |
| ------------ | ------ | ----------------------- | ------------------- |
| `store.json` | JSON   | Yes — `FileHelper.json` | Init and the action |

It records `bitcoinBackend`: a local Bitcoin node, or an Esplora URL.

**It deliberately has no default.** The declared dependency is derived from this field, so defaulting it would make Bitcoin appear as a dependency of a guardian the user has not configured yet — demanding they install a service they may not want. Undefined means "not chosen", and the package raises a task rather than guessing.

It is read reactively, so changing the backend restarts the guardian against the new source.

Everything the guardian itself persists — federation configuration, consensus state, its share of the custody — lives in its own database and is not modelled.

## Dependencies

One, declared optional, and required only on one of the two choices.

| Dependency | Required when                       | Health checks required      |
| ---------- | ----------------------------------- | --------------------------- |
| Bitcoin    | The Bitcoin backend is a local node | `bitcoind`, `sync-progress` |

Choose Esplora and the package has no dependencies at all.

**The Bitcoin address is resolved over the internal bridge, and the cookie is read and watched**, so the guardian restarts when Bitcoin rotates it. Both are strict: an unresolvable address, or a missing or malformed cookie, **stops the service from starting** with an explanatory error rather than letting it come up misconfigured. The RPC lookup pins the plaintext leg, since that binding publishes both.

**Requiring Bitcoin's sync check is deliberate.** A guardian reading from a node that is still doing its initial download would see an incomplete chain, which for a custody role is worse than waiting.

## Network Access and Interfaces

One interface.

| Interface          | Id   | Type | Port | Description                                 |
| ------------------ | ---- | ---- | ---- | ------------------------------------------- |
| Guardian Interface | `ui` | ui   | 8175 | Initial setup and this guardian's dashboard |

Bound on the `ui-multi` MultiHost over HTTP and not masked.

**Federation peers are reached over a transport the guardian manages itself**, not through a StartOS binding — the package enables it and does not export a port for it. So there is no peer interface to configure or to share with the other guardians; what they exchange during setup is handled in the interface above.

## Installation and First-Run Flow

Install seeds the store and raises a critical task to choose the Bitcoin backend. The service cannot start until that is done, because there is no default that would be right for everyone — one choice needs a node you may not run, the other sends queries to a third party.

The task check is **reactive**: it is raised on any init that finds no backend, not only on install.

Once started, everything else happens in the guardian's own interface: this is where a federation is created or joined, and where the other guardians' details are exchanged. **That setup is a one-time, coordinated ceremony among the guardians** — the package has no part in it and cannot repeat it.

## Actions

One action.

### Bitcoin Configuration

Chooses a local Bitcoin node or a remote Esplora endpoint.

- **What it changes:** the backend in the store, the declared Bitcoin dependency, and the mounted cookie.
- **Cost:** the service restarts and reconnects to the new source.
- **Repeat safety:** idempotent; neither backend holds state, so switching is a genuine swap.
- **What to weigh:** Esplora is a third party, and a guardian's queries reveal what the federation is doing. A local node keeps that on the box, at the cost of running one.

## Tasks

One.

| Task                  | Severity   | Raised when                        | Cleared when    |
| --------------------- | ---------- | ---------------------------------- | --------------- |
| Bitcoin Configuration | `critical` | No Bitcoin backend has been chosen | The action runs |

`critical` blocks the service from starting and suspends the ordinary controls, so a fresh install shows the task and nothing else.

## Health Checks

One check, on the only daemon.

| Check       | Displayed as         | Method                 |
| ----------- | -------------------- | ---------------------- |
| `fedimintd` | "Guardian Dashboard" | Port 8175 is listening |

It reports that the dashboard is serving. It says nothing about whether the federation has reached consensus, whether the other guardians are reachable, or whether setup was completed — all of which are visible in the dashboard.

A service that will not start at all, with no failing check, is most likely the Bitcoin backend: an unresolvable address or an unreadable cookie, named in the error.

## Backups and Restore

Both volumes are backed up, **with the live database excluded and a checkpoint restored in its place.**

That is the whole design, and it is worth understanding:

- **The live database and its lock file are excluded.** Copying a running database produces a torn snapshot, and for a consensus participant a corrupt or half-written database is worse than none.
- **The guardian's own checkpoints are included**, since it writes them for exactly this purpose.
- **On restore, the newest checkpoint is copied into place as the database** — but only if no database is already there. A restore over a live install leaves the existing database alone rather than overwriting it.

So a restored guardian resumes from its most recent checkpoint rather than from the moment the backup was taken. It needs its Bitcoin backend present on the new server, and it rejoins its federation from the restored state.

**A guardian is one of several.** The federation's safety comes from its threshold, not from this backup — but a guardian restored from a checkpoint that is too old may need the others to catch it up.

## Limitations and Differences

1. **The live database is never backed up**, only checkpoints. A restore rewinds to the newest one.
2. **A restore will not overwrite an existing database**, so restoring onto a live install is a no-op for the database.
3. **A Bitcoin backend must be chosen before the service will start.** There is no default.
4. **Esplora is a third party**, and a guardian's queries to it are informative about the federation.
5. **Mainnet only.** The network is fixed in the package.
6. **Federation setup is not managed here.** Creating or joining one is a coordinated ceremony in the guardian's own interface.
7. **No peer port is exported.** Guardian-to-guardian traffic uses the transport the daemon manages itself.

---

## Quick Reference for AI Consumers

```yaml
package_id: fedimint-guardian
image: built from ./Dockerfile
architectures:
  - x86_64
  - aarch64
subcontainers:
  - fedimintd-sub
volumes:
  main: package store only
  fedimintd: /fedimintd # database plus db_checkpoints
file_models:
  - store.json
startos_managed_env_vars:
  - FM_DATA_DIR
  - FM_BITCOIN_NETWORK
  - FM_BIND_UI
  - FM_ENABLE_IROH
  - FM_BITCOIND_URL # local-node backend only
  - FM_BITCOIND_USERNAME # from bitcoind's cookie
  - FM_BITCOIND_PASSWORD # from bitcoind's cookie
  - FM_ESPLORA_URL # esplora backend only
dependencies:
  - bitcoind # required only when the bitcoin backend is a local node
interfaces:
  ui: { type: ui, port: 8175 }
actions:
  - config-bitcoin
tasks:
  - { action: config-bitcoin, severity: critical } # reactive
health_checks:
  - fedimintd # displayed "Guardian Dashboard"
```
