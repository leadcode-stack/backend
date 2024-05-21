import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#apps/accounts/controllers/users_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('', [UsersController, 'store'])
      })
      // .middleware(middleware.auth())
  })
  .prefix('v1/users')
