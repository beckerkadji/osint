import { joiResolver } from "@hookform/resolvers/joi"
import { MutableRefObject, useRef } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../layouts/AuthLayout"
import UserType from "../_types/User.type"
import { createUserSchema, updatePasswordSchema, updateUserSchema } from "../_validations/user.validation"
import { AiOutlineUser } from "react-icons/ai"
import { useMutation } from "react-query"
import { updateUser } from "../authApi/api"
import { toast } from "react-toastify"

export default function UpdateModal (props: any) {
    const {
        register: registerUpdateUser,  
        formState:{ errors: errorsUpdateUser },
        handleSubmit: handleSubmitUpdateUser
    } = useForm<UserType.updateFields>({resolver: joiResolver(updateUserSchema)})

    const {
        register: registerPassword,  
        formState:{ errors: errorsPassword },
        handleSubmit: handleSubmitPassword
    } = useForm<UserType.updateFields>({ resolver: joiResolver(updatePasswordSchema)})

    const inputPassword = useRef() as MutableRefObject<HTMLDivElement>
    const Permissions = useRef() as MutableRefObject<HTMLDivElement>
    
    const {register: registerAuth, isRegistering} = useAuth();

    const {isLoading: isUpdateUser, mutateAsync: mutateAsyncUpdateUser} = useMutation(async (data: any) =>{
        console.log("Send",data) 
        const res =  await updateUser(data, props.token, props.data?.id)
        console.log(res)
        return res
    })

    const onUpdateUser = async (data : any)=> {
        const res = await mutateAsyncUpdateUser(data)
        if(res.data.code === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        } 
    }

    const {isLoading: isUpdatePassword, mutateAsync: mutateAsyncUpdatePassword} = useMutation(async (data: any) =>{
        console.log("Send",data) 
        const res =  await updateUser(data, props.token, props.data?.id)
        console.log(res)
        return res
    })

    const onUpdatePassword = async (data: any) => {
        const res = await mutateAsyncUpdatePassword(data)
        if(res.data.code === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        } 
    }

    
    return(
        <>
            {/* Update User Modal */}
            <div className="modal absolute fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="updateModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                Update  user
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <form onSubmit={handleSubmitUpdateUser(onUpdateUser)} >
                                <div className="grid grid-cols-2 gap-4">
                                <div className="form-group mb-6">
                                    <input type="text" 
                                    autoFocus
                                    className="
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    aria-describedby="emailHelp123" placeholder={props.data?.firstname} defaultValue={props.data?.firstname} {...registerUpdateUser("firstname")} />
                                </div>
                                <div className="form-group mb-6">
                                    <input type="text" className="form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    aria-describedby="emailHelp124" placeholder={props.data?.lastname} defaultValue={props.data?.lastname} {...registerUpdateUser("lastname")}/>
                                </div>
                                </div>
                                <div className="form-group mb-6">
                                <input type="text" className="form-control block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder={props.data?.username} defaultValue={props.data?.username} {...registerUpdateUser("username")}/>
                                </div>
                                <div className="form-group mb-6">
                                <input type="email" className="form-control block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    placeholder={props.data?.email} defaultValue={props.data?.email} {...registerUpdateUser("email")}/>
                                </div>
                                {/* <div className="w-full">
                                    <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                                        <input type="text"
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blackcolor focus:outline-none"
                                        data-mdb-toggle="datepicker" defaultValue={props.data?.blocked_at} {...registerUpdateUser("blocked_at")} />
                                        <label htmlFor="floatingInput" className="text-gray-700">blocked at {props.data?.blocked_at}</label>
                                    </div>
                                </div> */}
                                <div className="flex justify-center mt-4">
                                    <div className="w-full ">
                                        <p>actual role for this user is {props.data?.role.name}</p>
                                        <div className="flex justify-between w-3/4">
                                            
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault1"  defaultChecked={props.data?.role.id == 2 ? true: false}  value={'admin'} {...registerUpdateUser("role")} />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1" >
                                                    Admin
                                                </label>
                                            </div> 
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault2"  defaultChecked={props.data?.role.id == 3 ? true: false}  value={'user'} {...registerUpdateUser("role")} />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
                                                    user
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault3"  defaultChecked={props.data?.role.id == 4 ? true: false}  value={'intern'} {...registerUpdateUser("role")}/>
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault3">
                                                    intern
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <button type='button' data-bs-toggle="modal" data-bs-target="#updatePasswordModal"  className="mt-4 border-2 px-4 py-1.5 w-56 text-sm bg-thirdcolor">Change Password</button>
                                            <button type='button' data-bs-toggle="modal" data-bs-target="#updatePermissionModal"  className="mt-4 border-2 px-4 py-1.5 w-56 text-sm bg-thirdcolor">Change Permissions</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-red-500 translate-y-4 text-sm flex flex-col justify-center items-center  mb-10 py-10">
                                    {errorsUpdateUser.username && <p>{errorsUpdateUser.username.message}</p>}
                                    {errorsUpdateUser.firstname && <p>{errorsUpdateUser.firstname.message}</p>}
                                    {/* {errorsUpdateUser.blocked_at && <p>{errorsUpdateUser.blocked_at.message}</p>} */}
                                    {errorsUpdateUser.lastname && <p>{errorsUpdateUser.lastname.message}</p>}
                                    {errorsUpdateUser.role && <p>{errorsUpdateUser.role.message}</p>}
                                </div>
                                <div
                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                    <button type="button"
                                    className="inline-block px-6 py-2.5 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    Close
                                    </button>
                                    { isRegistering ?
                                        <button disabled type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                            <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>
                                        Loading...
                                        </button>   
                                    :
                                        <button type="submit" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Update</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update password Modal */}
            <div className="modal absolute fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="updatePasswordModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">Change Password</h5>
                        </div>
                        <div className="modal-body w-full">
                            <div className="w-full flex justify-center mt-4">
                                <button 
                                    type='button'
                                    className="dropdown-toggle transition duration-300 ease-in-out whitespace-nowrap flex h-full justify-center items-center">     
                                    <span className="relative h-9 w-9 bg-gray-300 rounded-full flex justify-center items-center">
                                        <AiOutlineUser />
                                    </span>
                                    <div className="laptop:flex flex-col laptop:p-2 phone:px-4 justify-center items-start h-8">
                                        <span className="text-[12px] font-bold mt-2"><span className="flex items-center">{props.data?.username}</span></span>
                                        <span className="text-xs -translate-y-1 text-gray-700">{props.data?.firstname}</span>
                                    </div>
                                </button>
                            </div>
                            <div className="form-group mb-6 transition duration-100 easy-in-out ">
                                <form onSubmit={handleSubmitPassword(onUpdatePassword)}>
                                    <div className="flex justify-center">
                                        <input type="password" className="form-control block
                                            w-2/3
                                            px-3
                                            py-1.5
                                            my-6
                                            mx-2
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                            placeholder="New Password" {...registerPassword("password")}/>
                                    </div>
                                    
                                    <div
                                        className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                        <button type="button"
                                        className="inline-block px-6 py-2.5 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-dismiss="modal">
                                        Close
                                        </button>
                                        { isUpdatePassword ?
                                            <button disabled type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                </svg>
                                            Loading...
                                            </button>   
                                        :
                                            <button type="submit" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Update</button>
                                        }
                                    </div>
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update permission modal */}
            <div className="modal absolute fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="updatePermissionModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">Change Permissions</h5>
                        </div>
                        <div className="modal-body">
                        <div className="w-full flex justify-center mt-4">
                                <button 
                                    type='button'
                                    className="dropdown-toggle transition duration-300 ease-in-out whitespace-nowrap flex h-full justify-center items-center">     
                                    <span className="relative h-9 w-9 bg-gray-300 rounded-full flex justify-center items-center">
                                        <AiOutlineUser />
                                    </span>
                                    <div className="laptop:flex flex-col laptop:p-2 phone:px-4 justify-center items-start h-8">
                                        <span className="text-[12px] font-bold mt-2"><span className="flex items-center">{props.data?.username}</span></span>
                                        <span className="text-xs -translate-y-1 text-gray-700">{props.data?.firstname}</span>
                                    </div>
                                </button>
                            </div>
                            <div ref={Permissions} className="flex w-full justify-center">
                                <div className="w-full p-4">
                                    <form className="">
                                        <div className="flex flex-col w-full justify-center items-center mt-4 mb-6">
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    READ USERS
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    EDIT USERS
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                                            </div>
                                            <div className="form-check flex justify-around  w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    DELETE USERS
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3 text-gray-800" htmlFor="flexCheckChecked">
                                                    BLOCK USERS
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    INVITE USERS
                                                </label>
                                                <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" />
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button"
                                            className="inline-block px-6 py-2.5 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out"
                                            data-bs-dismiss="modal">
                                            Close
                                            </button>
                                            { isRegistering ?
                                                <button disabled type="button" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                                    </svg>
                                                Loading...
                                                </button>   
                                            :
                                                <button type="submit" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Update</button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}