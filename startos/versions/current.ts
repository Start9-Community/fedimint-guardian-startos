import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.2:0',
  releaseNotes: {
    en_US:
      'Updated Fedimint to 0.12.2, which makes guardian connections to their peers more reliable. All guardians setting up a new federation together must use the same release, including the patch version. Full notes: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    es_ES:
      'Fedimint actualizado a 0.12.2, que hace más fiables las conexiones del guardián con sus pares. Todos los guardianes que configuren juntos una nueva federación deben usar la misma versión, incluida la versión de parche. Notas completas: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    de_DE:
      'Fedimint auf 0.12.2 aktualisiert, wodurch die Verbindungen des Guardians zu seinen Peers zuverlässiger werden. Alle Guardians, die gemeinsam eine neue Föderation einrichten, müssen dieselbe Version einschließlich der Patch-Version verwenden. Vollständige Versionshinweise: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    pl_PL:
      'Zaktualizowano Fedimint do 0.12.2, co zwiększa niezawodność połączeń strażnika z pozostałymi strażnikami. Wszyscy strażnicy wspólnie tworzący nową federację muszą używać tego samego wydania, łącznie z numerem poprawki. Pełne informacje o wydaniu: https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
    fr_FR:
      'Fedimint mis à jour vers 0.12.2, qui rend plus fiables les connexions du guardian avec ses pairs. Tous les guardians qui configurent ensemble une nouvelle fédération doivent utiliser la même version, y compris le numéro de correctif. Notes complètes : https://github.com/fedimint/fedimint/releases/tag/v0.12.2',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
