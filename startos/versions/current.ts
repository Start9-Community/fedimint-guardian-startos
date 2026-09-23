import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.0:2',
  releaseNotes: {
    en_US: `Backups now include the guardian's live database, so a restore returns the guardian to the moment the backup was taken. Take a new backup after updating.`,
    es_ES: `Las copias de seguridad ahora incluyen la base de datos activa del guardián, por lo que una restauración lo devuelve al momento en que se hizo la copia. Haz una copia de seguridad nueva después de actualizar.`,
    de_DE: `Backups enthalten jetzt die aktive Datenbank des Guardians, sodass eine Wiederherstellung ihn auf den Stand zum Zeitpunkt des Backups zurücksetzt. Erstelle nach dem Update ein neues Backup.`,
    pl_PL: `Kopie zapasowe obejmują teraz aktywną bazę danych strażnika, więc przywrócenie odtwarza jego stan z chwili wykonania kopii. Po aktualizacji wykonaj nową kopię zapasową.`,
    fr_FR: `Les sauvegardes incluent désormais la base de données active du guardian, si bien qu'une restauration le ramène à l'état du moment de la sauvegarde. Effectuez une nouvelle sauvegarde après la mise à jour.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
