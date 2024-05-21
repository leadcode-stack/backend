import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const userStoreValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(255),
    lastname: vine.string().minLength(3).maxLength(255),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(255).confirmed(),
  })
)

export type UserStoreSchema = Infer<typeof userStoreValidator>
