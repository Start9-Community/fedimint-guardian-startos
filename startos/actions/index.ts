import { sdk } from '../sdk'
import { configBitcoin } from './configBitcoin'

export const actions = sdk.Actions.of().addAction(configBitcoin)
