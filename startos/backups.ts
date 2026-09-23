import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) =>
    sdk.Backups.ofVolumes('main', 'fedimintd').setOptions({
      exclude: ['database.db.lock'],
    }),
)
