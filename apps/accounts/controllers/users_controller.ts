import { HttpContext } from '@adonisjs/core/http'
import { userStoreValidator } from '#apps/accounts/validators/users_validator'
import { inject } from '@adonisjs/core'
import UserService from '#apps/accounts/services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(userStoreValidator)
    return this.userService.create(data)
  }
}
