import BaseJoi from "joi"
import JoiDate from '@joi/date';
const Joi = BaseJoi.extend(JoiDate)

export const schema = {
    email : Joi.string().required(),
    Uemail : Joi.string().empty(),
    password : Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/))
        .message("Invalid Password"),
    Upassword : Joi.string()
        .optional()
        .min(8)
        .pattern(new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/))
        .message("Invalid Password"),
    firstName : Joi.string().min(2).required(),
    UfirstName : Joi.string().empty(''),
    username : Joi.string().min(8).max(20).required(),
    Uusername : Joi.string().empty('').min(8).max(20),
    fullName: Joi.string().min(2).required(),
    tel: Joi.string().min(9).max(14).pattern(/^[0-9]+$/).optional(),
    lastName : Joi.string().min(2).optional(),
    UlastName : Joi.string().empty('').min(2),
    phone : Joi.string().required().min(9),
    id : Joi.number().required(),
    age : Joi.number().min(1).max(100),
    title : Joi.string().required(),
    description : Joi.string().required(),
    image : Joi.string().required(),
    loginPassword: Joi.string().required(),
    otp: Joi.number().required(),
    role : Joi.string().required(),
    Urole : Joi.string().empty(''),
    date: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']).required(),
    Udate: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY', 'DD/MM/YYYY','YYYY-MM-DD']).optional(),
    token: Joi.string(),
    key: Joi.string(),
}


const test = () => {
    
    if(localStorage.getItem('token') !== null){
        return localStorage.getItem('token')
    }
}

export const storage = {
    getToken: () => test(),
    setData: (data: any) => {
        for(let [key, item] of data){
            localStorage.setItem(key, item)
        }
    },
    setToken: (token: any) => {
        localStorage.setItem('token', token)
    },
    clearToken: () => window.localStorage.removeItem('token'),
    clearData: () => localStorage.clear(),
};

export const generatePassword = async (): Promise<string> => {
    let result = '';
    let characters = <string>process.env.RANDOM_PASSWORD || "1234567890qwertyuyiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    let slugLength = characters.length
    for ( let i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            slugLength));
    }
    return result;
}

export const apiKey: string = <string>process.env.NEXT_PUBLIC_API_KEY;