import { RolePaginationSchema } from '#apps/accounts/validators/roles_validator'
import Permission from '#apps/accounts/models/permission'

export default class PermissionService {
  async paginate(schema: RolePaginationSchema) {
    return Permission.query()
      .if(schema.search, (query) => {
        query.where('name', 'ilike', `%${schema.search}%`)
      })
      .paginate(schema.page as number, schema.limit as number)
  }
}
