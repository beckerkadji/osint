import { data } from "autoprefixer";
// import {FunctionComponent} from "react";
// import { initReactQueryAuth } from "react-query-auth";
// import { login, register,getUserProfile, logoutUser } from "../authApi/api";
// import { storage } from "../utils/utils";
// import LoginType from "../_types/Login.type";
// import RegisterType from "../_types/Register.type";

// const loginFn =  async (data: LoginType.loginFields) => {
//     const response = await login(data)

//     return response
// }

// const registerFn = async(data: RegisterType.registerFields) => {
//     const response = await register(data)

//     return response
// }

// const loadUser =  async () => {
//     let user = null;

//     if(
//         storage.getToken() !== null &&
//         storage.getToken() !== undefined
//     ) {
//         const data =  await getUserProfile();
//         user = data
//     }

//     return user
// }

// const logoutFn = async (data: string)=>{
//     const response = await logoutUser(data)

//     return response
// }
// const authConfig : any = {
//     loadUser,
//     loginFn,
//     registerFn,
//     logoutFn
// }

// const testData = () => {
//     return initReactQueryAuth(authConfig);
// };

// const { AuthProvider , useAuth } = initReactQueryAuth(authConfig)

// export {AuthProvider, useAuth, testData};