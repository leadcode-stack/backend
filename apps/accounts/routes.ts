import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#apps/accounts/controllers/users_controller')
const RolesController = () => import('#apps/accounts/controllers/roles_controller')
const PermissionsController = () => import('#apps/accounts/controllers/permissions_controller')

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
      .prefix('users')

    router
      .group(() => {
        router.get('', [RolesController, 'index'])
        router.get(':id', [RolesController, 'show'])
        router.post('', [RolesController, 'store'])
        router.put(':id', [RolesController, 'update'])
        router.delete(':id', [RolesController, 'destroy'])
      })
      .prefix('roles')

    router
      .group(() => {
        router.get('', [PermissionsController, 'index'])
      })
      .prefix('permissions')
  })
  .prefix('v1')
  .middleware(middleware.auth())
