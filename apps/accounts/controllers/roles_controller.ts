import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RoleService from '#apps/accounts/services/role_service'
import { roleStoreValidator, roleUpdateValidator } from '#apps/accounts/validators/roles_validator'

@inject()
export default class RolesController {
  constructor(private roleService: RoleService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search')

    return this.roleService.paginate({ page, limit, search })
  }

  async show({ params }: HttpContext) {
    return this.roleService.findByIdOrFail(params.id)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(roleStoreValidator)
    return this.roleService.create(data)
  }

  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(roleUpdateValidator)
    const user = await this.roleService.findByIdOrFail(params.id)
    return this.roleService.update(user, data)
  }

  async destroy({ params }: HttpContext) {
    const user = await this.roleService.findByIdOrFail(params.id)
    return user.delete()
  }
}
