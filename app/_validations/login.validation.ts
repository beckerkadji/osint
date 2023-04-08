import { schema } from '../utils/utils'
import Joi from 'joi'

export const loginSchema = Joi.object({
    username : schema.username,
    password : schema.loginPassword
})

export const loginUserSchema = Joi.object({
    password : schema.password,
})
