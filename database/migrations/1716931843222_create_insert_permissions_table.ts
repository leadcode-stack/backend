import { BaseSchema } from '@adonisjs/lucid/schema'
import Permission from '#apps/accounts/models/permission'

export default class extends BaseSchema {
  protected tableName = Permission.table

  async up() {
    this.defer(async (db) => {
      await db
        .insertQuery()
        .table(this.tableName)
        .insert([
          { name: 'View users', uid: 'view:users', description: 'Can view Permissions', is_staff_only: true },
          { name: 'Create user', uid: 'create:users', description: 'Can create user', is_staff_only: true },
          { name: 'Update user', uid: 'update:users', description: 'Can update user', is_staff_only: true },
          { name: 'Delete user', uid: 'delete:users', description: 'Can delete user', is_staff_only: true },
          { name: 'Manage user', uid: 'manage:users', description: 'Can manage user', is_staff_only: true },

          { name: 'View roles', uid: 'view:roles', description: 'Can view roles', is_staff_only: true },
          { name: 'Create role', uid: 'create:roles', description: 'Can create role', is_staff_only: true },
          { name: 'Update role', uid: 'update:roles', description: 'Can update role', is_staff_only: true },
          { name: 'Delete role', uid: 'delete:roles', description: 'Can delete role', is_staff_only: true },
          { name: 'Manage role', uid: 'manage:roles', description: 'Can manage role', is_staff_only: true },

          { name: 'View articles', uid: 'view:articles', description: 'Can view articles' },
          { name: 'Create article', uid: 'create:articles', description: 'Can create article' },
          { name: 'Update article', uid: 'update:articles', description: 'Can update article' },
          { name: 'Delete article', uid: 'delete:articles', description: 'Can delete article' },
          { name: 'Manage article', uid: 'manage:articles', description: 'Can manage article' },

          { name: 'View projects', uid: 'view:projects', description: 'Can view projects', is_staff_only: true },
          { name: 'Create project', uid: 'create:projects', description: 'Can create project', is_staff_only: true },
          { name: 'Update project', uid: 'update:projects', description: 'Can update project', is_staff_only: true },
          { name: 'Delete project', uid: 'delete:projects', description: 'Can delete project', is_staff_only: true },
          { name: 'Manage project', uid: 'manage:projects', description: 'Can manage project', is_staff_only: true },
        ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
