import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.1:0',
  releaseNotes: {
    en_US:
      'Updated Fedimint to 0.12.1, allowing new federation setup with guardians on that release. All guardians must use the same upstream release, including the patch version, during setup. No consensus or database changes for existing federations. Full upstream notes: https://github.com/fedimint/fedimint/releases/tag/v0.12.1',
    es_ES:
      'Fedimint actualizado a 0.12.1, lo que permite crear nuevas federaciones con guardianes de esa versión. Todos los guardianes deben usar la misma versión de Fedimint, incluida la versión de parche, durante la configuración. Sin cambios de consenso ni de base de datos para las federaciones existentes. Notas completas: https://github.com/fedimint/fedimint/releases/tag/v0.12.1',
    de_DE:
      'Fedimint auf 0.12.1 aktualisiert, um neue Föderationen mit Guardians dieser Version einzurichten. Alle Guardians müssen bei der Einrichtung dieselbe Fedimint-Version einschließlich der Patch-Version verwenden. Keine Konsens- oder Datenbankänderungen für bestehende Föderationen. Vollständige Versionshinweise: https://github.com/fedimint/fedimint/releases/tag/v0.12.1',
    pl_PL:
      'Zaktualizowano Fedimint do 0.12.1, umożliwiając tworzenie nowych federacji ze strażnikami używającymi tego wydania. Podczas konfiguracji wszyscy strażnicy muszą używać tej samej wersji Fedimint, łącznie z numerem poprawki. Brak zmian konsensusu i bazy danych dla istniejących federacji. Pełne informacje o wydaniu: https://github.com/fedimint/fedimint/releases/tag/v0.12.1',
    fr_FR:
      'Fedimint mis à jour vers 0.12.1 pour permettre la création de nouvelles fédérations avec des guardians utilisant cette version. Tous les guardians doivent utiliser la même version de Fedimint, y compris le numéro de correctif, pendant la configuration. Aucun changement de consensus ou de base de données pour les fédérations existantes. Notes complètes : https://github.com/fedimint/fedimint/releases/tag/v0.12.1',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
