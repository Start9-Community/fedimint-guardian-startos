# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **`ssl: false` on bitcoind's RPC lookup.** That binding publishes a plaintext _and_ a TLS bridge address; the host id comes from `bitcoin-core-startos/startos/utils` rather than a hardcoded hostname.
- **Throwing on an unresolvable address or an unreadable cookie is deliberate.** A guardian that starts against a half-configured Bitcoin backend is worse than one that refuses and says which piece is missing.
- **`backups.ts` and the migrations address volumes as `/media/startos/volumes/<name>`** — the container runtime's own mount of them, the same convention used across the fleet. That is a different vantage point from the host path you see over SSH (`/media/startos/data/package-data/volumes/…`); don't "correct" one into the other. Renaming a volume means editing these literals.
