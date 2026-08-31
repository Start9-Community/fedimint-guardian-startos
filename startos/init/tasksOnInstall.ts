import { configBitcoin } from '../actions/configBitcoin'
import { setGuardianPassword } from '../actions/setGuardianPassword'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const tasksOnInstall = sdk.setupOnInit(async (effects) => {
  if (!(await storeJson.read((s) => s.bitcoinBackend).const(effects))) {
    await sdk.action.createOwnTask(effects, configBitcoin, 'critical', {
      reason: i18n('Fedimint needs to know which Bitcoin backend to use'),
    })
  }

  if (!(await storeJson.read((s) => s.guardianPassword).const(effects))) {
    await sdk.action.createOwnTask(effects, setGuardianPassword, 'critical', {
      reason: i18n(
        'The Guardian Dashboard is served without a login until a password is set',
      ),
    })
  }
})
