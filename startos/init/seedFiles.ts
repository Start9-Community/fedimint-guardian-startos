import { utils } from '@start9labs/start-sdk'
import { readFile } from 'fs/promises'
import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'

// Host-side path of the fedimintd data volume. fedimintd ≤0.11 persisted the
// guardian admin password here; 0.12 dropped the file in favor of the
// FM_PASSWORD_UI / FM_PASSWORD_API environment variables.
const LEGACY_PASSWORD_FILE = '/media/startos/volumes/fedimintd/password.private'

// Password seeding lives here (init) rather than in a version migration:
// VersionGraph migrations only run on the update path between two existing
// data versions, so a migration would never seed fresh installs. setupOnInit
// runs on every init (install, update, restore, and regular startup), before
// main, and the "only seed when absent" guard makes it idempotent.
export const seedFiles = sdk.setupOnInit(async (effects) => {
  await storeJson.merge(effects, {})

  const existing = await storeJson.read((s) => s.guardianPassword).once()
  if (!existing) {
    // Guardians who upgraded from fedimintd ≤0.11 already know the password
    // from password.private — keep it. Otherwise generate a fresh one.
    const legacy = await readFile(LEGACY_PASSWORD_FILE, 'utf-8').then(
      (contents) => contents.trim(),
      () => '',
    )
    const guardianPassword =
      legacy || utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 22 })
    await storeJson.merge(effects, { guardianPassword })
  }
})
