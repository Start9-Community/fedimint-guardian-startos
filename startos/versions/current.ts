import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:1',
  releaseNotes: {
    en_US:
      "Requires StartOS 0.4.2 or later. With a local Bitcoin node, the guardian reads only the RPC credential Bitcoin publishes for dependent services, and none of Bitcoin's other data. Requires a current Bitcoin release; update Bitcoin first if StartOS reports its version as unsupported.",
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. Con un nodo Bitcoin local, el guardián lee solo la credencial RPC que Bitcoin publica para los servicios dependientes, y ningún otro dato de Bitcoin. Requiere una versión actual de Bitcoin; actualice Bitcoin primero si StartOS indica que su versión no es compatible.',
    de_DE:
      'Erfordert StartOS 0.4.2 oder neuer. Mit einem lokalen Bitcoin-Knoten liest der Guardian nur die RPC-Zugangsdaten, die Bitcoin für abhängige Dienste veröffentlicht, und keine anderen Daten von Bitcoin. Erfordert eine aktuelle Bitcoin-Version; aktualisieren Sie zuerst Bitcoin, wenn StartOS dessen Version als nicht unterstützt meldet.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Przy lokalnym węźle Bitcoin strażnik odczytuje tylko dane uwierzytelniające RPC, które Bitcoin udostępnia usługom zależnym, i żadnych innych danych Bitcoin. Wymaga aktualnej wersji Bitcoin; najpierw zaktualizuj Bitcoin, jeśli StartOS zgłasza jego wersję jako nieobsługiwaną.',
    fr_FR:
      "Nécessite StartOS 0.4.2 ou ultérieur. Avec un nœud Bitcoin local, le guardian lit uniquement l'identifiant RPC que Bitcoin publie pour les services dépendants, et aucune autre donnée de Bitcoin. Nécessite une version à jour de Bitcoin ; mettez d'abord Bitcoin à jour si StartOS indique que sa version n'est pas prise en charge.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
