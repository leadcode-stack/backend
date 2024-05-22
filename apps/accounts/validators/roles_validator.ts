import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const rolePaginationValidator = vine.compile(
  vine.object({
    limit: vine.number().min(1).max(100),
    page: vine.number().min(1),
  })
)

export const roleStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(255),
    textColor: vine.string(),
    backgroundColor: vine.string(),
  })
)

export const roleUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(255),
    textColor: vine.string(),
    backgroundColor: vine.string(),
  })
)

export type RolePaginationSchema = Infer<typeof rolePaginationValidator>
export type RoleStoreSchema = Infer<typeof roleStoreValidator>
export type RoleUpdateSchema = Infer<typeof roleUpdateValidator>
