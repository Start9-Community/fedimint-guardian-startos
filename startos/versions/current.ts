import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '0.12.0:1',
  releaseNotes: {
    en_US: `The Guardian Dashboard now requires a password to sign in. Guardians upgrading from a release before 0.12.0 keep the password they already use. Everyone else must run the new Set Guardian Password action to generate one before the guardian will start; the same action issues a replacement at any time.`,
    es_ES: `El Panel del Guardián ahora requiere una contraseña para iniciar sesión. Los guardianes que actualizan desde una versión anterior a la 0.12.0 conservan la contraseña que ya usan. El resto debe ejecutar la nueva acción Establecer Contraseña del Guardián para generar una antes de que el guardián arranque; la misma acción emite un reemplazo en cualquier momento.`,
    de_DE: `Für die Anmeldung am Guardian-Dashboard ist jetzt ein Passwort erforderlich. Guardians, die von einer Version vor 0.12.0 aktualisieren, behalten ihr bisheriges Passwort. Alle anderen müssen die neue Aktion Guardian-Passwort festlegen ausführen, um eines zu erzeugen, bevor der Guardian startet; dieselbe Aktion stellt jederzeit ein Ersatzpasswort aus.`,
    pl_PL: `Logowanie do Panelu Strażnika wymaga teraz hasła. Strażnicy aktualizujący z wydania starszego niż 0.12.0 zachowują hasło, którego już używają. Pozostali muszą uruchomić nową akcję Ustaw Hasło Strażnika, aby wygenerować hasło, zanim strażnik wystartuje; ta sama akcja wydaje zamiennik w dowolnym momencie.`,
    fr_FR: `La connexion au tableau de bord Guardian nécessite désormais un mot de passe. Les guardians qui mettent à niveau depuis une version antérieure à la 0.12.0 conservent le mot de passe qu'ils utilisent déjà. Les autres doivent exécuter la nouvelle action Définir le mot de passe du Guardian pour en générer un avant que le guardian ne démarre ; la même action en délivre un nouveau à tout moment.`,
  },
  migrations: {
    up: async ({ effects }) => {
      if (await storeJson.read((s) => s.guardianPassword).once()) return

      const legacy = await sdk.volumes.fedimintd
        .readFile('password.private', 'utf-8')
        .then((contents) => String(contents).trim())
        .catch(() => '')

      if (legacy) {
        await storeJson.merge(effects, { guardianPassword: legacy })
      }
    },
    down: IMPOSSIBLE,
  },
})
