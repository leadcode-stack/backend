import { UserStoreSchema } from '#apps/accounts/validators/users_validator'
import User from '#apps/accounts/models/user'

export default class UserService {
  async create(schema: UserStoreSchema) {
    return User.create(schema)
  }
}
