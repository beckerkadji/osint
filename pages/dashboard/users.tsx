import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineSearch} from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { deleteUser, getAllUser, updatePermissions, updateUser} from "../../app/authApi/api";
import React from 'react';
import { FaUserPlus } from "react-icons/fa";
import TableHeader from "../../app/components/Datatable/TableHeader";
import Pagination from "../../app/components/Datatable/Pagination";
import { useRouter } from "next/router";
import { useAuth } from "../../app/layouts/AuthLayout";
import Link from "next/link";
import { AiFillDashboard, AiOutlineClose, AiOutlineLogout, AiOutlineMail, AiOutlinePhone, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import { generatePassword, storage } from "../../app/utils/utils";
import { HiUsers } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import UserType, { PERMISSION } from "../../app/_types/User.type";
import { joiResolver } from "@hookform/resolvers/joi";
import { createUserSchema, updatePasswordSchema, updateUserSchema } from "../../app/_validations/user.validation";
import Header from "../../app/components/Header";



export default function Users() {

    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
            storage.removeToken()
            storage.clearData()
            router.push('/login')
          }
    }, [router])

    const usertable = useRef() as MutableRefObject<HTMLDivElement>
    const [currentPage, setCurrentPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [user, setUser] = useState<any>()
    const ItemPerPage = 5   
    const token: any = localStorage.getItem('token')

    const {
        register,  
        formState:{ errors },
        handleSubmit
    } = useForm<UserType.createFields>({ resolver: joiResolver(createUserSchema)})


    const {register: registerAuth, isRegistering} = useAuth();

    const onCreateUser = async (data: any)=>{
        let password =  await generatePassword();
        data.password = password
        await registerAuth({data, token})
    }

    const userData = useQuery("userList", async () => {
        const response = await getAllUser(token)
        if(response.data.message === 'NOT AUTHORIZED'){
            storage.clearData()
            router.push('/login')
        }
        return response.data.data
    })
        
    const sideNavBar = useRef() as MutableRefObject<HTMLDivElement>
    
    const {logout} = useAuth()
    
    const openSideNav = ()=>{
        sideNavBar.current.style.width = "200px";
        sideNavBar.current.style.opacity = "1";
        // section.current.style.marginLeft ="200px";
    }
    const closeSideNav = () => {
        sideNavBar.current.style.width = "0"
        // section.current.style.marginLeft ="0";
    }

    const onLogout = async () => {
        const res = await logout(token)
        if (res.data.code === "success"){
            storage.removeToken()
            storage.clearData()
            router.push('/login')
        }else{
            toast.error(res.data.message)
        }
    }

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


    const {isLoading: isUpdateUser, mutateAsync: mutateAsyncUpdateUser} = useMutation(async (data: any) =>{
        const res =  await updateUser(data, token, user?.id)
        return res
    })

    const {mutateAsync: mutateAsyncDeleteUser} = useMutation( async (userId: any) =>{
        const res = await deleteUser(token, userId)
        return res
    })

    const onDeleteUser = async (userid: any) => {
        if(confirm('Delete this user ?') == true){
            const res =  await mutateAsyncDeleteUser(userid)
            if(res.data.code === "success"){
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message);
            } 
        }   
    }

    const onUpdateUser = async (data : any)=> {
        const res = await mutateAsyncUpdateUser(data)
        if(res.data.code === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        } 
    }

    const {isLoading: isUpdatePassword, mutateAsync: mutateAsyncUpdatePassword} = useMutation(async (data: any) =>{
        const res =  await updateUser(data, token, user?.id)
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

    //PERMISSION 
    const {
        register: registerPermission,  
        formState:{ errors: errorsPermissions },
        handleSubmit: handleSubmitPermission
    } = useForm<UserType.givePermissionFields>()

    const {isLoading: isUpdatePermissions, mutateAsync: mutateAsyncUpdatePermissions} = useMutation(async (data: any) =>{
        const res =  await updatePermissions(data, token, user?.id)
        return res
    })

    const onPermissions = async (data:any) =>{
        const res =  await mutateAsyncUpdatePermissions(data)
        if(res.data.code === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        } 
    }
    

    return  (
       <>
            <section className="h-screen relative ">
        	   
                {/* <Header /> */}
                    <Header page={'Manage User'}/>
                {/* end header*/}

                <div className="absolute phone:left-0 laptop:left-auto laptop:right-0  top-[10%] laptop:w-[83%] phone:w-full phone:h-screen w-[80%] z-0 left-[18%]  text-gray-300 text-xs phone:flex-col tablet:h-[90%] laptop:flex laptop:flex-row justify-end">
                    <div ref={usertable} className="laptop:w-[95%] laptop:-translate-x-10 laptop:h-[90%] phone:mt-14 laptop:mt-8 phone:mx-1 phone:w-[100%] phone:h-[88%] tablet:h-[80%] flex justify-center items-center">
                        <div className="relative h-[80%] w-[90%] bg-white translate-y-4 rounded-lg">
                            <button 
                                type="button"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                className="absolute active:shadow-lg transition duration-150 ease-in-out right-0 top-[-3rem] px-3 py-2 bg-gray-300 rounded-lg w-24 text-blackcolor flex justify-between items-center text-xs"
                            >
                                Add user <FaUserPlus />
                            </button>
                            <div className="absolute top-[-3rem] left-0  flex phone:w-1/2 justify-start">
                                <div className="mb-3 xl:w-96">
                                    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
                                        <input type="search" className="form-control outline-none relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blackcolor focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                        <span className="input-group-text flex items-center px-3 py-1.5 text-base text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full sm:-mx-6 lg:-mx-8">
                            <div className="flex flex-col">
                                <div className="py-0  inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-x-auto ">
                                    <table className="min-w-full rounded-lg overflow-y-scroll ">
                                    <TableHeader />
                                    <tbody>
                                        {userData.isLoading ? <p>Loading...</p> : null}
                                        {
                                            userData.data ? 
                                            (
                                                userData.data.map((user: any, key:number)=>(
                                                    <tr className="border-b hover:bg-gray-200" key={key}>
                                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{key+1}</td>
                                                        <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap">
                                                            {user.username}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap">
                                                            {user.email}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap lowercase">
                                                            {user.role.name}
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap">
                                                            <p className="flex justify-around">
                                                                <button
                                                                    onClick={()=>setUser(user)}
                                                                    type="button"
                                                                    data-bs-toggle="modal" data-bs-target="#updateModal">
                                                                    <AiFillEdit/>   
                                                                </button>
                                                                <button
                                                                    onClick={()=>onDeleteUser(user.id)}
                                                                    type="button">
                                                                    <AiFillDelete/>  
                                                                </button>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))
                                            ):(
                                                <p>Empty data</p>
                                            )
                                        }
                                        
                                    </tbody>
                                    </table>
                                    <div className="flex text-xs flex justify-end mt-2">
                                        <Pagination 
                                            total={totalItems}
                                            itemsPerPage={ItemPerPage}
                                            currentPages={currentPage}
                                            onPageChange={ (page: any) => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Create User Modal */}

            {/* <Modal token={token}/> */}
            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="staticBackdrop" tabIndex={2} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                Create new user
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <form onSubmit={handleSubmit(onCreateUser)} >
                                <div className="grid grid-cols-2 gap-4">
                                <div className="form-group mb-6">
                                    <input type="text" 
                                    className="form-control
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
                                    aria-describedby="emailHelp123" placeholder="First name" {...register("firstname")} />
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
                                    aria-describedby="emailHelp124" placeholder="Last name" {...register("lastname")}/>
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
                                    placeholder="User Name" {...register("username")}/>
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
                                    placeholder="Email address" {...register("email")}/>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-full">
                                        <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                                            <input type="text"
                                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blackcolor focus:outline-none"
                                            placeholder="Select a date" data-mdb-toggle="datepicker" {...register("blocked_at")} />
                                            <label htmlFor="floatingInput" className="text-gray-700">blocked to</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <div className="w-full ">
                                        <div className="flex justify-between w-3/4">
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault1" {...register("role")} value={'admin'} />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
                                                    Admin
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault2" {...register("role")} value={"user"}/>
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
                                                    user
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault3" {...register("role")} value={'intern'}  />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault3">
                                                    intern
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-red-500 translate-y-4 text-sm flex flex-col justify-center items-center   mb-5 py-5">
                                    {errors.username && <p>{errors.username.message}</p>}
                                    {errors.firstname && <p>{errors.firstname.message}</p>}
                                    {errors.blocked_at && <p>{errors.blocked_at.message}</p>}
                                    {errors.lastname && <p>{errors.lastname.message}</p>}
                                    {errors.role && <p>{errors.role.message}</p>}
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
                                        <button type="submit" className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Create user</button>
                                    }
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            {/* <UpdateModal token={token} data={user} /> */}
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
                                    aria-describedby="emailHelp123" placeholder={user?.firstname} defaultValue={user?.firstname} {...registerUpdateUser("firstname")} />
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
                                    aria-describedby="emailHelp124" placeholder={user?.lastname} defaultValue={user?.lastname} {...registerUpdateUser("lastname")}/>
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
                                    placeholder={user?.username} defaultValue={user?.username} {...registerUpdateUser("username")}/>
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
                                    placeholder={user?.email} defaultValue={user?.email} {...registerUpdateUser("email")}/>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <div className="w-full ">
                                        <p>actual role for this user is {user?.role.name}</p>
                                        <div className="flex justify-between w-3/4">
                                            
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault1"  defaultChecked={user?.role.id == 2 ? true: false}  value={'admin'} {...registerUpdateUser("role")} />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1" >
                                                    Admin
                                                </label>
                                            </div> 
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault2"  defaultChecked={user?.role.id == 3 ? true: false}  value={'user'} {...registerUpdateUser("role")} />
                                                <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault2">
                                                    user
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blackcolor checked:border-blackcolor focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="flexRadioDefault3"  defaultChecked={user?.role.id == 4 ? true: false}  value={'intern'} {...registerUpdateUser("role")}/>
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
                                    <div className="laptop:flex relative flex-col laptop:p-2 phone:px-4 justify-center items-start h-8">
                                        <span className="text-[12px] font-bold mt-2 "><span className="flex items-center">{user?.username}</span></span>
                                        <span className="text-xs absolute top-3 left-4 text-gray-700">{user?.firstname}</span>
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
                                    <div className="text-red-500 translate-y-4 text-sm flex flex-col justify-center items-center  mb-10 py-10">
                                        {errorsPassword.password && <p>{errorsPassword.password.message}</p>}
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
                                        <span className="text-[12px] font-bold mt-2"><span className="flex items-center">{user?.username}</span></span>
                                        <span className="text-xs -translate-y-1 text-gray-700">{user?.role.name}</span>
                                    </div>
                                </button>
                            </div>
                            <div ref={Permissions} className="flex w-full justify-center flex-col items-center">

                                <hr className="w-full border-[1px] border-blackcolor mt-5"/>
                                <div className="w-full p-4">
                                    <form className="" onSubmit={handleSubmitPermission(onPermissions)}>
                                        <div className="flex flex-col w-full text-sm justify-center items-center mt-4 mb-6">
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    READ USERS
                                                </label>
                                                <input type='checkbox' {...registerPermission('permissions')} value={PERMISSION.READ_USER} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    EDIT USERS
                                                </label>
                                                <input type='checkbox' value={PERMISSION.EDIT_USER} {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around  w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    DELETE USERS
                                                </label>
                                                <input  type='checkbox' value={PERMISSION.READ_USER}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3 text-gray-800" htmlFor="flexCheckChecked">
                                                    BLOCK USERS
                                                </label>
                                                <input type='checkbox' value={PERMISSION.BLOCK_USER} {...registerPermission('permissions')}   className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    INVITE USERS
                                                </label>
                                                <input type='checkbox' value={PERMISSION.INVITE_USER}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    ADD PERMISSION
                                                </label>
                                                <input type='checkbox' value={PERMISSION.ADD_PERMISSION}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    REMOVE PERMISSION
                                                </label>
                                                <input type='checkbox' value={PERMISSION.REMOVE_PERMISSION} {...registerPermission('permissions')}   className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    CHANGE ROLE
                                                </label>
                                                <input  type='checkbox' value={PERMISSION.CHANGE_ROLE}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    READ SESSION
                                                </label>
                                                <input type='checkbox' value={PERMISSION.READ_SESSION}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    LOGOUT SESSION
                                                </label>
                                                <input type='checkbox' value={PERMISSION.LOGOUT_SESSION} {...registerPermission('permissions')} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    ADD TARGET
                                                </label>
                                                <input type='checkbox' value={PERMISSION.ADD_TARGET} {...registerPermission('permissions')}   className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    EDIT TARGET
                                                </label>
                                                <input type='checkbox' value={PERMISSION.EDIT_TARGET} {...registerPermission('permissions')}   className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    REMOVE TARGET
                                                </label>
                                                <input type='checkbox' value={PERMISSION.REMOVE_TARGET} {...registerPermission('permissions')}   className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"  />
                                            </div>
                                            <div className="form-check flex justify-around w-2/3">
                                                <label className="form-check-label w-2/3  text-gray-800" htmlFor="flexCheckChecked">
                                                    ADD SUP SEARCH
                                                </label>
                                                <input  type='checkbox' value={PERMISSION.READ_USER}  {...registerPermission('permissions')}  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blackcolor checked:border-gray-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"   />
                                            </div>
                                        </div>
                                        <div
                                            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                            <button type="button"
                                            className="inline-block px-6 py-2.5 bg-gray-200 text-gray-800 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-100 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-200 active:shadow-lg transition duration-150 ease-in-out"
                                            data-bs-dismiss="modal">
                                            Close
                                            </button>
                                            { isUpdatePermissions ?
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
