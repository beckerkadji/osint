import { schema } from '../utils/utils'
import Joi from 'joi'


export const verifyOtpSchema = Joi.object({
    username : schema.username,
    otp: schema.otp
})