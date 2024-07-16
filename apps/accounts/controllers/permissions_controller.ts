import { HttpContext } from '@adonisjs/core/http'
import PermissionService from '#apps/accounts/services/permission_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PermissionsController {
  constructor(private permissionService: PermissionService) {}
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search')

    console.log({ page, limit, search })

    return this.permissionService.paginate({ page, limit, search })
  }
}



