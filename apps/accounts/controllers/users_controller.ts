import { HttpContext } from '@adonisjs/core/http'
import { userStoreValidator, userUpdateValidator } from '#apps/accounts/validators/users_validator'
import { inject } from '@adonisjs/core'
import UserService from '#apps/accounts/services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    return this.userService.paginate({ page, limit })
  }

  async show({ params }: HttpContext) {
    return this.userService.findByIdOrFail(params.id)
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(userStoreValidator)
    return this.userService.create(data)
  }

  async update({ request, params }: HttpContext) {
    console.log(request.all())
    const data = await request.validateUsing(userUpdateValidator)
    const user = await this.userService.findByIdOrFail(params.id)
    return this.userService.update(user, data)
  }

  async destroy({ params }: HttpContext) {
    const user = await this.userService.findByIdOrFail(params.id)
    return user.delete()
  }
}
