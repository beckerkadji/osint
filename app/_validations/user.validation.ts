import Joi from 'joi';
import { schema } from '../utils/utils';

export const createUserSchema = Joi.object({
    firstname : schema.firstName,
    lastname : schema.lastName,
    username : schema.username,
    email : schema.email,
    role : schema.role,
    blocked_at : schema.date
})

export const updateUserSchema = Joi.object({
    firstname : schema.UfirstName,
    lastname : schema.UlastName,
    username : schema.Uusername,
    password: schema.Upassword,
    email : schema.Uemail,
    role : schema.Urole,
    blocked_at : schema.Udate
})

export const updatePasswordSchema = Joi.object({
    password : schema.password,
})

export const searchSchema = Joi.object({
    key : schema.key,
})