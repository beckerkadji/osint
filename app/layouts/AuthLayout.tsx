import { data } from "autoprefixer";
import { useRouter } from "next/router";
import {FunctionComponent} from "react";
import { initReactQueryAuth } from "react-query-auth";
import { toast } from "react-toastify";
import { login, register,getUserProfile, logoutUser } from "../authApi/api";
import { storage } from "../utils/utils";
import LoginType from "../_types/Login.type";
import UserType from "../_types/User.type";
import RegisterType from "../_types/User.type";

type AuthLayoutProps = {
    children : JSX.Element
}

const loginFn =  async (data: LoginType.loginFields) => {

    const response = await login(data)
    if(response.data.code === "success"){
        toast.success(response.data.message)
        storage.setToken(response.data.token)
        localStorage.setItem("email", data.username)
    }else {
        toast.error(response.data.message)
    }
    return response
}

const registerFn = async(object: any) => {
    const response = await register(object.data, object.token)
    if(response.data.code === "success"){
        toast.success(response.data.message)
    }else {
        toast.error(response.data.message)
    }
    return response
}

const loadUser =  async () => {
    let response = await getUserProfile();

    return response
}

const logoutFn = async (data: string)=>{
    const response = await logoutUser(data)

    return response
}
const authConfig : any = {
    loadUser,
    loginFn,
    registerFn,
    logoutFn
}

const testData = () => {
    return initReactQueryAuth(authConfig);
};

const { AuthProvider , useAuth } = initReactQueryAuth(authConfig)

export {AuthProvider, useAuth, testData};
