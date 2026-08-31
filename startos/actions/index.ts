import { sdk } from '../sdk'
import { configBitcoin } from './configBitcoin'
import { setGuardianPassword } from './setGuardianPassword'

export const actions = sdk.Actions.of()
  .addAction(configBitcoin)
  .addAction(setGuardianPassword)
