import { HttpContext } from '@adonisjs/core/http'
import User from '#apps/accounts/models/user'

export default class AuthenticationController {
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await user.load('roles', (query) => query.preload('permissions'))
    await user.load('projects')

    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return { user, token }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  async me({ auth }: HttpContext) {
    await auth.user?.load('roles', (query) => query.preload('permissions'))
    await auth.user?.load('projects', (query) => query.preload('user'))
    return auth.user
  }
}
