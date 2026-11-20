import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:2',
  releaseNotes: {
    en_US:
      'With a local node selected and a Bitcoin too old to publish the RPC credential the guardian reads, the guardian no longer fails to start: it waits and tells you to update Bitcoin.',
    es_ES:
      'Con un nodo local seleccionado y un Bitcoin demasiado antiguo para publicar la credencial RPC que lee el guardián, el guardián ya no falla al iniciarse: espera y le indica que actualice Bitcoin.',
    de_DE:
      'Mit ausgewähltem lokalem Knoten und einem Bitcoin, das zu alt ist, um die vom Guardian gelesenen RPC-Zugangsdaten bereitzustellen, startet der Guardian nicht mehr fehlerhaft: Er wartet und fordert Sie auf, Bitcoin zu aktualisieren.',
    pl_PL:
      'Gdy wybrano węzeł lokalny, a Bitcoin jest zbyt stary, by udostępniać dane uwierzytelniające RPC odczytywane przez strażnika, strażnik nie kończy już uruchamiania błędem: czeka i prosi o aktualizację Bitcoina.',
    fr_FR:
      "Avec un nœud local sélectionné et un Bitcoin trop ancien pour publier l'identifiant RPC que lit le guardian, le guardian n'échoue plus au démarrage : il attend et vous invite à mettre Bitcoin à jour.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
