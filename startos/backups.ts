import * as fs from 'fs'
import * as path from 'path'
import { sdk } from './sdk'

const fedimintdVolume = '/media/startos/volumes/fedimintd'

export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.ofVolumes('fedimintd')
      .setOptions({
        exclude: ['database', 'database.db.lock'],
      })
      .setPostRestore(async () => {
        const dbDir = path.join(fedimintdVolume, 'database')
        const checkpointsDir = path.join(fedimintdVolume, 'db_checkpoints')

        if (!fs.existsSync(dbDir) && fs.existsSync(checkpointsDir)) {
          const checkpoints = fs.readdirSync(checkpointsDir)
          if (checkpoints.length > 0) {
            const checkpoint = checkpoints[0]
            const src = path.join(checkpointsDir, checkpoint)
            console.info(
              `Restoring database from checkpoint: ${checkpoint}`,
            )
            fs.cpSync(src, dbDir, { recursive: true })
          }
        }
      }),
)
