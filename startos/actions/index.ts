import { sdk } from '../sdk'
import { configBitcoin } from './configBitcoin'
import { guardianPassword } from './guardianPassword'

export const actions = sdk.Actions.of()
  .addAction(configBitcoin)
  .addAction(guardianPassword)
