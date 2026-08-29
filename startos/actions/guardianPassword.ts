import { storeJson } from '../fileModels/store'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const guardianPassword = sdk.Action.withoutInput(
  'guardian-password',
  {
    name: i18n('Guardian Password'),
    description: i18n(
      'Reveal the password used to sign in to the Guardian Dashboard',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  async ({ effects }) => {
    const password = await storeJson.read((s) => s.guardianPassword).once()
    if (!password) {
      // Seeded on init — only reachable if the action runs before the very
      // first init has completed.
      throw new Error(i18n('Guardian password has not been generated yet'))
    }
    return {
      version: '1' as const,
      title: i18n('Guardian Password'),
      message: i18n('Use this password to sign in to the Guardian Dashboard'),
      result: {
        type: 'single' as const,
        value: password,
        copyable: true,
        qr: false,
        masked: true,
      },
    }
  },
)
