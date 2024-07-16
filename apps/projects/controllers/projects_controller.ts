import ProjectService from '#apps/projects/services/project_service'
import { HttpContext } from '@adonisjs/core/http'
import { roleStoreValidator, roleUpdateValidator } from '#apps/accounts/validators/roles_validator'
import { inject } from '@adonisjs/core'

@inject()
export default class ProjectsController {
  constructor(private projectService: ProjectService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search')

    return this.projectService.paginate({ page, limit, search })
  }

  async show({ params }: HttpContext) {
    return this.projectService.findByIdOrFail(params.id)
  }

  async findForUser({ auth }: HttpContext) {
    return this.projectService.findForUser(auth.user!.id)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(roleStoreValidator)
    return this.projectService.create(data)
  }

  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(roleUpdateValidator)
    const user = await this.projectService.findByIdOrFail(params.id)
    return this.projectService.update(user, data)
  }

  async destroy({ params }: HttpContext) {
    const user = await this.projectService.findByIdOrFail(params.id)
    return user.delete()
  }
}
