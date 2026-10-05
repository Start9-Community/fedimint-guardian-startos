import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.1:1',
  releaseNotes: {
    en_US:
      'The Bitcoin backend selected in Bitcoin Configuration is now saved as chosen. If you selected an Esplora server, run Bitcoin Configuration again.',
    es_ES:
      'El backend de Bitcoin seleccionado en Configuración de Bitcoin ahora se guarda tal como se eligió. Si seleccionaste un servidor Esplora, vuelve a ejecutar Configuración de Bitcoin.',
    de_DE:
      'Das in Bitcoin-Konfiguration gewählte Bitcoin-Backend wird jetzt wie gewählt gespeichert. Wenn du einen Esplora-Server gewählt hast, führe Bitcoin-Konfiguration erneut aus.',
    pl_PL:
      'Backend Bitcoin wybrany w akcji Konfiguracja Bitcoin jest teraz zapisywany zgodnie z wyborem. Jeśli wybrano serwer Esplora, uruchom ponownie akcję Konfiguracja Bitcoin.',
    fr_FR:
      'Le backend Bitcoin sélectionné dans Configuration Bitcoin est désormais enregistré tel que choisi. Si vous avez sélectionné un serveur Esplora, relancez Configuration Bitcoin.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
