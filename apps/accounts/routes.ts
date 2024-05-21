import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#apps/accounts/controllers/users_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('', [UsersController, 'index'])
        router.get(':id', [UsersController, 'show'])
        router.post('', [UsersController, 'store'])
        router.put(':id', [UsersController, 'update'])
        router.delete(':id', [UsersController, 'destroy'])
      })
      .middleware(middleware.auth())
  })
  .prefix('v1/users')
