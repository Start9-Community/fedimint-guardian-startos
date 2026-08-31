import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const setGuardianPassword = sdk.Action.withoutInput(
  'set-guardian-password',
  {
    name: i18n('Set Guardian Password'),
    description: i18n(
      'Generate a new password for signing in to the Guardian Dashboard. Running this on a live guardian restarts it to apply the new password.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  async ({ effects }) => {
    const guardianPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    await storeJson.merge(effects, { guardianPassword })

    return {
      version: '1',
      title: i18n('Guardian Password'),
      message: i18n('Use this password to sign in to the Guardian Dashboard'),
      result: {
        type: 'single',
        value: guardianPassword,
        copyable: true,
        qr: false,
        masked: true,
      },
    }
  },
)
