import { storeJson } from '../fileModels/store'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await storeJson.merge(effects, {})
  } else {
    await storeJson.merge(effects, {})
  }
})
