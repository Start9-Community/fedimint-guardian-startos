import * as fs from 'fs'
import * as path from 'path'
import { sdk } from './sdk'

const fedimintdVolume = '/media/startos/volumes/fedimintd'

// The live database is deliberately excluded: a copy of a running consensus
// database is torn, and a corrupt one is worse than none. The guardian writes
// db_checkpoints for exactly this, so restore seeds from the newest one --
// and only when no database is already there, so a restore over a live install
// leaves it alone.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.ofVolumes('main', 'fedimintd')
      .setOptions({
        exclude: ['database', 'database.db.lock'],
      })
      .setPostRestore(async (effects) => {
        const dbDir = path.join(fedimintdVolume, 'database')
        const checkpointsDir = path.join(fedimintdVolume, 'db_checkpoints')

        if (fs.existsSync(dbDir) || !fs.existsSync(checkpointsDir)) return

        const checkpoints = fs.readdirSync(checkpointsDir).sort()
        const latest = checkpoints[checkpoints.length - 1]
        if (!latest) return

        console.info(`Restoring database from checkpoint: ${latest}`)
        fs.cpSync(path.join(checkpointsDir, latest), dbDir, { recursive: true })
      }),
)
