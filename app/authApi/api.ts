import { data } from 'autoprefixer'
import axios from 'axios'
import { storage } from '../utils/utils'

import LoginType from '../_types/Login.type'
import UserType from '../_types/User.type'

const url = <string>process.env.NEXT_PUBLIC_AUTH_URL
const Targeting = <string>process.env.NEXT_PUBLIC_TARGETING
const UserNameService = <string>process.env.NEXT_PUBLIC_USERNAME
export const login = async (data: LoginType.loginFields)=>{
    let res: any = await axios.post(`${url}/login`, data)
    return res
}

export const register = async (data: UserType.createFields, token: string) => {
    let res: any = await axios.post(`${url}/user`, data ,
    {
        headers : {
            "Authorization": token
        }
    })
    return res
}

export const logoutUser = async (token: string) => {
    return await axios.get(`${url}/logout`,
    {
        headers:{
            "Authorization": token
        }
    })
}

export const logoutSession =  async (data: any) => {
    let res = await axios.post(`${url}/session/logout`, {api_key: data.apikey},
    {
        headers:{
            "Authorization" : data.token
        }
    }
    )
    return res
}


export const getSession = async (token: string) => {
    let res: any =  await axios.get(`${url}/session`,
    {
        headers:{
            "Authorization": token
        }
    })
    return res
}

export const getAllUser = async (token: string) => {
    let res: any =  await axios.get(`${url}/user`,
    {
        headers:{
            "Authorization": token
        }
    })
    return res
}

export const getUser = async (token: string, userid: any) => {
    let res: any =  await axios.get(`${url}/user/${userid}`, 
    {
        headers:{
            "Authorization": token
        },
    })
    return res
}

export const deleteUser = async (token: string, userid: any) => {
    let res: any =  await axios.delete(`${url}/user/${userid}`, 
    {
        headers:{
            "Authorization": token
        },
    })
    return res
}

export const loginVerifyOtp = async (data: LoginType.verifyOtp) =>{
    return await axios.post(`${url}/login/second_factor`, data)
}

export const loginResendOtp = async (data: LoginType.ResendOtp) =>{
    return await axios.post(`${url}/login/resend_otp`, data)
}

export const updateUser = async (data: UserType.updateFields, token:string, userid: string) =>{
    return await axios.put(`${url}/user/${userid}`, 
    data,
    {
        headers:{
            "Authorization" : token
        }
    }
    )
}

export const updatePermissions = async (data: UserType.givePermissionFields, token:string, userid: string) =>{
    return await axios.post(`${url}/permission/${userid}`, 
    data,
    {
        headers:{
            "Authorization" : token
        }
    }
    )
}

export const updateUserPasswordCredential = async (data: LoginType.loginUserFields) =>{
    return await axios.post(`${url}/user/login_user`, data)
}

export const search = async (data: UserType.searchFields) =>{
    return await axios.post(`${Targeting}/target/find`, data)
}

export const searchUsername = async (data: UserType.searchFields) =>{
    return await axios.get(
        `${UserNameService}/search/${data.key}`
    )
}

export const createSearch = async (data: UserType.searchFields) =>{
    return await axios.post(`${Targeting}/target/create`, data)
}

export const getUsernameStat = async () => {
    return await axios.get(`${UserNameService}/search/stat`)
}

export const getPhonestat = async () => {
    return await axios.get(`${Targeting}/target/stat`)
}


export const getUserProfile = async () => {
    if(
        storage.getToken() !== null &&
        storage.getToken() !== undefined
    ) {
        let allData : any = []
        let keys = Object.keys(localStorage)
        let i = keys.length

        while (i--){
            allData.push(localStorage.getItem(keys[i]));
        }
        return allData;
    }
}