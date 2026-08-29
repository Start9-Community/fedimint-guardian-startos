import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.12.0:1',
  releaseNotes: {
    en_US: `The Guardian Dashboard and the admin API are now protected by a password. On fresh installs a strong password is generated automatically; guardians who upgraded from a pre-0.12 release keep their existing password. Reveal and copy it at any time via the new Guardian Password action.`,
    es_ES: `El Panel del Guardián y la API de administración ahora están protegidos por una contraseña. En instalaciones nuevas se genera automáticamente una contraseña fuerte; los guardianes que actualizaron desde una versión anterior a 0.12 conservan su contraseña existente. Puedes mostrarla y copiarla en cualquier momento mediante la nueva acción Contraseña del Guardián.`,
    de_DE: `Das Guardian-Dashboard und die Admin-API sind jetzt durch ein Passwort geschützt. Bei Neuinstallationen wird automatisch ein starkes Passwort generiert; Guardians, die von einer Version vor 0.12 aktualisiert haben, behalten ihr bestehendes Passwort. Über die neue Aktion Guardian-Passwort kannst du es jederzeit anzeigen und kopieren.`,
    pl_PL: `Panel Strażnika i API administracyjne są teraz chronione hasłem. Przy nowych instalacjach silne hasło jest generowane automatycznie; strażnicy, którzy zaktualizowali z wersji starszej niż 0.12, zachowują swoje dotychczasowe hasło. Możesz je w każdej chwili wyświetlić i skopiować za pomocą nowej akcji Hasło Strażnika.`,
    fr_FR: `Le tableau de bord Guardian et l'API d'administration sont désormais protégés par un mot de passe. Lors des nouvelles installations, un mot de passe fort est généré automatiquement ; les guardians ayant mis à niveau depuis une version antérieure à 0.12 conservent leur mot de passe existant. Vous pouvez l'afficher et le copier à tout moment via la nouvelle action Mot de passe du Guardian.`,
  },
  migrations: {
    // Deliberately a no-op: the guardian password is seeded in init
    // (startos/init/seedFiles.ts), not here. VersionGraph migrations only run
    // on the update path between existing data versions, so a migration would
    // never cover fresh installs; setupOnInit runs on every init (install,
    // update, restore, startup) and is idempotent, which also lets it pick up
    // a legacy password.private from pre-0.12 installs.
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
