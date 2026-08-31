A Fedimint federation is set up by a small group of guardians (typically 3, 5, or 7) who jointly run a Distributed Key Generation (DKG) ceremony at first launch. This package is the **guardian side** of that flow — install it on each guardian's StartOS server, then coordinate the ceremony out of band (a group call works well).

## Documentation

- [Fedimint](https://fedimint.org) — the upstream project home, with guides for guardians, users, and gateway operators.

## What you get on StartOS

- A **Guardian Interface** web UI that walks you through federation setup on first launch and becomes your Guardian Dashboard once the federation is running.
- A choice of Bitcoin backend: a locally installed **Bitcoin** node (recommended), or a remote **Esplora** API. The backend is set before the service starts.
- A `fedimintd` daemon that participates in your federation's consensus once setup is complete.

## Getting set up

Before the service can start, you must tell it where to get Bitcoin data and set the password that protects the dashboard. After install, StartOS posts two critical tasks:

1. Run the **Bitcoin Configuration** task. Pick either:
   - **Local node (recommended)** — uses the Bitcoin dependency. Install Bitcoin first if you haven't; the guardian will read its cookie automatically.
   - **Esplora** — point at an Esplora API (defaults to `https://mempool.space/api`).
2. Run the **Set Guardian Password** task. It generates a password and shows it once — copy it somewhere safe before closing the result. (Upgrading from a release before 0.12.0? This task does not appear: your guardian keeps the password you already use.)
3. Start the service and open the **Guardian Interface**, signing in with that password.
4. Coordinate with your fellow guardians out of band. One of you will act as the **leader** and the others as **followers**:
   - **Leader:** choose **Set up Fedimint**, pick a federation name, the number of guardians, and the guardian threshold. The interface will produce a setup code to share with the other guardians.
   - **Followers:** choose **Join setup** and paste the leader's setup code.
5. Once every guardian has joined, the leader starts the federation. All guardians' interfaces run the DKG ceremony together; this takes a minute or two. When it finishes, each guardian sees the Guardian Dashboard and the federation is live.
6. Copy the federation **invite code** from the dashboard and share it with the users who will join your federation.

> If your guardian needs to reach the other guardians' fedimintd processes over the internet, make sure inbound networking is configured on each StartOS server. Fedimintd will publish its addresses via Iroh and Pkarr by default.

## Using Fedimint Guardian

### Guardian Interface

After setup, the Guardian Interface is your dashboard for federation operations: monitoring consensus, viewing federation balances, managing module configuration, and recovering or rotating your guardian credentials. Sign in with the password from the **Set Guardian Password** action.

### Actions

- **Bitcoin Configuration** — switch between a local Bitcoin node and a remote Esplora API at any time. Re-run this if you initially picked Esplora and later install Bitcoin (or vice versa).
- **Set Guardian Password** — generate the password used to sign in to the Guardian Dashboard, and show it once. Run it again to replace a password you have lost or want to change; a running guardian restarts to pick the new one up.
