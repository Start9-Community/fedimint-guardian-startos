import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.11.1:6',
  releaseNotes: {
    en_US: `Fixes "Bitcoind cookie is missing" every time Bitcoin Core restarts.

Fedimint Guardian reloads when Bitcoin Core issues new RPC credentials, which it does on every restart. That reload was previously triggered as soon as Bitcoin Core *began* shutting down, at which point the credentials had already been removed — so the Guardian restarted, found no credentials, and failed with "Bitcoind cookie is missing". It now reloads only once Bitcoin Core is back up and has published new credentials.

This only affects guardians using a local Bitcoin Core backend; Esplora setups were never impacted.`,
    es_ES: `Corrige el error «Falta la cookie de Bitcoind» cada vez que Bitcoin Core se reinicia.

Fedimint Guardian se recarga cuando Bitcoin Core emite nuevas credenciales RPC, algo que hace en cada reinicio. Esa recarga se activaba en cuanto Bitcoin Core *empezaba* a apagarse, momento en el que las credenciales ya se habían eliminado — así que el Guardian se reiniciaba, no encontraba credenciales y fallaba con «Falta la cookie de Bitcoind». Ahora se recarga solo cuando Bitcoin Core ha vuelto y ha publicado nuevas credenciales.

Esto solo afecta a los guardianes que usan un backend local de Bitcoin Core; las configuraciones con Esplora nunca se vieron afectadas.`,
    de_DE: `Behebt „Bitcoind-Cookie fehlt“ bei jedem Neustart von Bitcoin Core.

Fedimint Guardian lädt neu, sobald Bitcoin Core neue RPC-Zugangsdaten ausgibt — was bei jedem Neustart geschieht. Dieses Neuladen wurde bisher ausgelöst, sobald Bitcoin Core mit dem Herunterfahren *begann*; zu diesem Zeitpunkt waren die Zugangsdaten bereits entfernt. Der Guardian startete also neu, fand keine Zugangsdaten und scheiterte mit „Bitcoind-Cookie fehlt“. Er lädt jetzt erst neu, wenn Bitcoin Core wieder läuft und neue Zugangsdaten veröffentlicht hat.

Betroffen sind nur Guardians mit lokalem Bitcoin-Core-Backend; Esplora-Konfigurationen waren nie betroffen.`,
    pl_PL: `Naprawia błąd „Brak cookie Bitcoind” przy każdym restarcie Bitcoin Core.

Fedimint Guardian przeładowuje się, gdy Bitcoin Core wydaje nowe dane uwierzytelniające RPC, co robi przy każdym restarcie. Dotąd to przeładowanie uruchamiało się, gdy tylko Bitcoin Core *zaczynał* się wyłączać — a dane uwierzytelniające były już wtedy usunięte. Guardian restartował się więc, nie znajdował danych i kończył błędem „Brak cookie Bitcoind”. Teraz przeładowuje się dopiero wtedy, gdy Bitcoin Core wróci i opublikuje nowe dane uwierzytelniające.

Dotyczy to wyłącznie guardianów korzystających z lokalnego backendu Bitcoin Core; konfiguracje z Esplorą nigdy nie były dotknięte tym problemem.`,
    fr_FR: `Corrige l'erreur « Cookie Bitcoind manquant » à chaque redémarrage de Bitcoin Core.

Fedimint Guardian se recharge lorsque Bitcoin Core émet de nouveaux identifiants RPC, ce qu'il fait à chaque redémarrage. Ce rechargement était jusqu'ici déclenché dès que Bitcoin Core *commençait* à s'arrêter, moment où les identifiants avaient déjà été supprimés — le Guardian redémarrait donc, ne trouvait aucun identifiant et échouait avec « Cookie Bitcoind manquant ». Il ne se recharge désormais qu'une fois Bitcoin Core revenu et de nouveaux identifiants publiés.

Seuls les guardians utilisant un backend Bitcoin Core local sont concernés ; les configurations Esplora n'ont jamais été affectées.`,
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
