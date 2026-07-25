import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.11.1:4',
  releaseNotes: {
    en_US: `Resolves the addresses of connected services more reliably.

Fedimint Guardian looked up where to reach its dependencies through a field that only applies to one of the two ways a service can publish a port. It now reads the address itself, so a dependency changing how it serves TLS can no longer leave Fedimint Guardian unable to find it. Nothing changes in normal operation.`,
    es_ES: `Resuelve de forma más fiable las direcciones de los servicios conectados.

Fedimint Guardian localizaba sus dependencias mediante un campo que solo se aplica a una de las dos formas en que un servicio puede publicar un puerto. Ahora lee la dirección en sí, de modo que si una dependencia cambia su forma de servir TLS, Fedimint Guardian seguirá encontrándola. En funcionamiento normal no cambia nada.`,
    de_DE: `Ermittelt die Adressen verbundener Dienste zuverlässiger.

Fedimint Guardian suchte seine Abhängigkeiten über ein Feld, das nur für eine der beiden Arten gilt, auf die ein Dienst einen Port veröffentlichen kann. Jetzt wird die Adresse selbst gelesen, sodass eine Abhängigkeit, die ihre TLS-Bereitstellung ändert, für Fedimint Guardian auffindbar bleibt. Im normalen Betrieb ändert sich nichts.`,
    pl_PL: `Pewniej ustala adresy połączonych usług.

Fedimint Guardian wyszukiwał swoje zależności przez pole, które dotyczy tylko jednego z dwóch sposobów publikowania portu przez usługę. Teraz odczytuje sam adres, więc zależność zmieniająca sposób udostępniania TLS nadal pozostanie odnajdywalna dla Fedimint Guardian. W normalnej pracy nic się nie zmienia.`,
    fr_FR: `Détermine plus fiablement les adresses des services connectés.

Fedimint Guardian localisait ses dépendances via un champ qui ne s'applique qu'à l'un des deux modes de publication d'un port par un service. Il lit désormais l'adresse elle-même : une dépendance qui change sa façon de servir TLS reste donc trouvable par Fedimint Guardian. Rien ne change en fonctionnement normal.`,
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
