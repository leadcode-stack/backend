import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { Database } from '@adonisjs/lucid/database'
import User from '#apps/accounts/models/user'

export const userPaginationValidator = vine.compile(
  vine.object({
    limit: vine.number().min(1).max(100),
    page: vine.number().min(1),
  })
)

export const userStoreValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(255),
    lastname: vine.string().minLength(3).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(255).confirmed(),
  })
)

export const userUpdateValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(255).optional(),
    lastname: vine.string().minLength(3).maxLength(255).optional(),
    email: vine
      .string()
      .email()
      .unique(async (db: Database, value: string, field) => {
        const userId: number = +field.data.params.id
        const user = await db.from(User.table).where('email', value).first()

        return user ? user.id === userId : !user
      })
      .optional(),
    password: vine.string().minLength(8).maxLength(255).confirmed().optional(),
  })
)

export type UserPaginationSchema = Infer<typeof userPaginationValidator>
export type UserStoreSchema = Infer<typeof userStoreValidator>
export type UserUpdateSchema = Infer<typeof userUpdateValidator>
