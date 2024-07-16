import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const projectPaginationValidator = vine.compile(
  vine.object({
    limit: vine.number().min(1).max(100),
    page: vine.number().min(1),
    search: vine.string().optional(),
  })
)

export const projectStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(255),
  })
)

export const projectUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255).optional(),
    description: vine.string().minLength(3).maxLength(255).optional(),
  })
)

export type ProjectPaginationSchema = Infer<typeof projectPaginationValidator>
export type ProjectStoreSchema = Infer<typeof projectStoreValidator>
export type ProjectUpdateSchema = Infer<typeof projectUpdateValidator>
