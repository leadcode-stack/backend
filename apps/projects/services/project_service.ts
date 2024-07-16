import Project from '#apps/projects/models/project'
import {
  ProjectPaginationSchema,
  ProjectStoreSchema,
  ProjectUpdateSchema,
} from '#apps/projects/validators/projects_validator'

export default class ProjectService {
  async paginate(schema: ProjectPaginationSchema) {
    return Project.query()
      .if(schema.search, (query) => {
        query.where('name', 'ilike', `%${schema.search}%`)
      })
      .paginate(schema.page as number, schema.limit as number)
  }

  async findByIdOrFail(id: number) {
    return Project.query().where('id', id).firstOrFail()
  }

  async create(schema: ProjectStoreSchema) {
    return Project.create(schema)
  }

  async update(project: Project, schema: ProjectUpdateSchema) {
    await project.merge(schema).save()

    return project
  }
}
