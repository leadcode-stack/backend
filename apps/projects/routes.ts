import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ProjectsController = () => import('#apps/projects/controllers/projects_controller')

router
  .group(() => {
    router
      .group(() => {
        router.get('', [ProjectsController, 'index'])
        router.get(':id', [ProjectsController, 'show'])
        router.post('', [ProjectsController, 'store'])
        router.put(':id', [ProjectsController, 'update'])
        router.delete(':id', [ProjectsController, 'destroy'])
      })
      .prefix('roles')
  })
  .prefix('v1')
  .middleware(middleware.auth())
