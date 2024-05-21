import {
  UserPaginationSchema,
  UserStoreSchema,
  UserUpdateSchema,
} from '#apps/accounts/validators/users_validator'
import User from '#apps/accounts/models/user'

export default class UserService {
  async paginate(schema: UserPaginationSchema) {
    return User.query()
      .preload('roles')
      .paginate(schema.page as number, schema.limit as number)
  }

  async findByIdOrFail(id: number) {
    return User.query()
      .where('id', id)
      .preload('roles', (query) => query.preload('permissions'))
      .firstOrFail()
  }

  async create(schema: UserStoreSchema) {
    return User.create(schema)
  }

  async update(user: User, schema: UserUpdateSchema) {
    return user.merge(schema).save()
  }
}
