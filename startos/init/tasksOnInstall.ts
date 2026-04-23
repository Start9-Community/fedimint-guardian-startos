import { configBitcoin } from '../actions/configBitcoin'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const tasksOnInstall = sdk.setupOnInit(async (effects, kind) => {
  if (!(await storeJson.read((s) => s.bitcoinBackend).const(effects))) {
    await sdk.action.createOwnTask(effects, configBitcoin, 'critical', {
      reason: i18n('Fedimint needs to know which Bitcoin backend to use'),
    })
  }
})
