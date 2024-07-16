import Role from '#apps/accounts/models/role'
import {
  RolePaginationSchema,
  RoleStoreSchema,
  RoleUpdateSchema,
} from '#apps/accounts/validators/roles_validator'

export default class RoleService {
  async paginate(schema: RolePaginationSchema) {
    return Role.query()
      .preload('permissions')
      .paginate(schema.page as number, schema.limit as number)
  }

  async findByIdOrFail(id: number) {
    return Role.query().where('id', id).preload('permissions').firstOrFail()
  }

  async create(schema: RoleStoreSchema) {
    return Role.create(schema)
  }

  async update(role: Role, schema: RoleUpdateSchema) {
    await role.merge(schema).save()

    if (schema.permissions) {
      await role.related('permissions').sync(schema.permissions)
    }

    return role
  }
}
