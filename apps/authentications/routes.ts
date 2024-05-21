import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthenticationController = () =>
  import('#apps/authentications/controllers/authentication_controller')

router
  .group(() => {
    router.post('login', [AuthenticationController, 'login'])
    router
      .group(() => {
        router.delete('logout', [AuthenticationController, 'logout'])
        router.get('me', [AuthenticationController, 'me'])
      })
      .middleware(middleware.auth())
  })
  .prefix('v1/authentication')
