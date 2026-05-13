A Fedimint federation is set up by a small group of guardians (typically 3, 5, or 7) who jointly run a Distributed Key Generation (DKG) ceremony at first launch. This package is the **guardian side** of that flow — install it on each guardian's StartOS server, then coordinate the ceremony out of band (a group call works well).

## Documentation

- [Fedimint](https://fedimint.org) — the upstream project home, with guides for guardians, users, and gateway operators.

## What you get on StartOS

- A **Guardian Interface** web UI that walks you through federation setup on first launch and becomes your Guardian Dashboard once the federation is running.
- A choice of Bitcoin backend: a locally installed **Bitcoin Core** (recommended), or a remote **Esplora** API. The backend is set before the service starts.
- A `fedimintd` daemon that participates in your federation's consensus once setup is complete.

## Getting set up

Before the service can start, you must tell it where to get Bitcoin data. After install, StartOS posts a critical task **Bitcoin Configuration**:

1. Run the **Bitcoin Configuration** task. Pick either:
   - **Local node (recommended)** — uses the Bitcoin Core dependency. Install Bitcoin Core first if you haven't; the guardian will read its cookie automatically.
   - **Esplora** — point at an Esplora API (defaults to `https://mempool.space/api`).
2. Start the service and open the **Guardian Interface**.
3. Coordinate with your fellow guardians out of band. One of you will act as the **leader** and the others as **followers**:
   - **Leader:** choose **Set up Fedimint**, pick a federation name, the number of guardians, the guardian threshold, and a password. The interface will produce a setup code to share with the other guardians.
   - **Followers:** choose **Join setup**, paste the leader's setup code, and set your own password.
4. Once every guardian has joined, the leader starts the federation. All guardians' interfaces run the DKG ceremony together; this takes a minute or two. When it finishes, each guardian sees the Guardian Dashboard and the federation is live.
5. Copy the federation **invite code** from the dashboard and share it with the users who will join your federation.

> If your guardian needs to reach the other guardians' fedimintd processes over the internet, make sure inbound networking is configured on each StartOS server. Fedimintd will publish its addresses via Iroh and Pkarr by default.

## Using Fedimint Guardian

### Guardian Interface

After setup, the Guardian Interface is your dashboard for federation operations: monitoring consensus, viewing federation balances, managing module configuration, and recovering or rotating your guardian credentials. Sign in with the password you chose during setup.

### Actions

- **Bitcoin Configuration** — switch between a local Bitcoin Core node and a remote Esplora API at any time. Re-run this if you initially picked Esplora and later install Bitcoin Core (or vice versa).
