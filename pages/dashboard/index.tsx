import Link from "next/link";
import { MutableRefObject, useEffect, useRef } from "react";
import {  AiFillDashboard, AiOutlineClose, AiOutlineLogout, AiOutlineMail, AiOutlinePhone, AiOutlineSearch, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BsArrowRightCircle, BsThreeDotsVertical } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { getPhonestat, getSession, getUsernameStat, logoutSession } from "../../app/authApi/api";
import Header from "../../app/components/Header";
import React from 'react';
import { useRouter } from "next/router";
import { storage } from "../../app/utils/utils";
import { useAuth } from "../../app/layouts/AuthLayout";


export default function Dashboard() {
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
    

    const router = useRouter()
    let tokenU = localStorage.getItem('token') ;
    useEffect(()=>{
        if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
            storage.removeToken()
            storage.clearData()
            router.push('/login')
          }
    }, [tokenU, router])

    const main = useRef() as MutableRefObject<HTMLDivElement>
    const token: any = localStorage.getItem('token')

    const result = useQuery("sessionList", async () => {
        const response = await getSession(token)
        if(response.data.message === 'NOT AUTHORIZED'){
            storage.clearData()
            router.push('/login')
        }
        return response.data
    })

    const usernameStat = useQuery('usernameStat', async () => {
        const response = await getUsernameStat()
        return response.data
    })

    const phoneStat = useQuery('phoneStat', async () => {
        const response = await getPhonestat()
        return response.data
    })
    
    const {isLoading: islogoutSession, mutateAsync: mutateAsyncLogoutUser} = useMutation(async (apikey: any) =>{
        const res =  await logoutSession({apikey, token})
        console.log(res)

        return res
    })
    
    const onLogoutSession = async (id: any) => {
        const res = await mutateAsyncLogoutUser(id)
        if (res.data.code === "success"){
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }

    return  (
       <>
            <section className="h-screen relative">
                {/* <Header /> */}
                <section className="flex h-screen w-full relative z-100">
                    <div id="mySideNav" ref={sideNavBar} className="h-full w-0 laptop:hidden  duration-500 opacity-0 fixed z-10 top-0 left-0 overflow-x-hidden pt-14 duration-500 bg-blackcolor text-whitecolor">
                        <button onClick={closeSideNav} className="absolute top-4 text-gray-300 right-6 text-xl ml-12"><AiOutlineClose /></button> 
                        <Link href={'/dashboard'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center" >
                            <AiFillDashboard className="text-xl" /><span className="pl-5">Dashboard</span>
                        </Link> 
                        <Link href={'/dashboard/users'} className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                            <HiUsers className="text-xl" /><span className="pl-5">Manage users</span>
                        </Link>
                        <Link href={'/dashboard/username'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                            <AiOutlineSearch className="text-xl" /><span className="pl-5">Username</span>
                        </Link> 
                        <Link href={'/dashboard/phone'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                            <AiOutlinePhone className="text-xl" /><span className="pl-5">phone</span>
                        </Link> 
                        <div className="h-[10%] absolute bottom-5 w-full flex justify-center items-center self-end ">
                            <button
                            onClick={onLogout}
                            className="flex items-center">
                                <AiOutlineLogout />
                                <span className="ml-2 text-xs cursor-pointer">Log out</span>
                            </button>
                        </div>
                    </div>
                <div className="index h-full w-[20%] phone:hidden laptop:block desktop:fixed bg-white">
                    <div className="phone:hidden laptop:relative laptop:block h-full flex flex-col justify-between border-r-2 border-thirdcolor">
                        <div className="h-[13%] w-full flex justify-center items-center">
                            <span className="flex  items-center w-1/4 h-14">
                                <span className="font-bold text-xl mr-2">OSINT</span>
                            </span>
                        </div>
                        <div className="h-[60%] w-full flex justify-center">
                            <div className="w-[80%]  text-gray-700 flex flex-col ">
                            <Link href={'/dashboard'}  className={` ${router.pathname == '/dashboard' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiFillDashboard /><span className="mx-2">Dashboard</span></Link>
                            <Link href={'/dashboard/users'}  className={` ${router.pathname == '/dashboard/users' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><HiUsers /><span className="mx-2" >Manage users </span></Link>
                            <Link href={'/dashboard/username'}  className={` ${router.pathname =='/dashboard/username' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlineSearch /><span className="mx-2">Username</span></Link>
                            <Link href={'/dashboard/phone'}  className={` ${router.pathname =='/dashboard/phone' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlinePhone /><span className="mx-2">Phone</span></Link>
                            </div>
                        </div>
                        <div className="h-[10%] absolute bottom-5 w-full flex justify-center items-center self-end ">
                            <button
                            onClick={onLogout}
                            className="flex items-center w-1/2">
                                <AiOutlineLogout />
                                <span className="ml-2 text-xs cursor-pointer">Log out</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="index h-[13%] phone:w-full flex items-center justify-between desktop:w-[80%] fixed z-100 desktop:right-0 bg-white border-[1px] border-gray-100">
                    <div className="phone:hidden laptop:block ml-4 w-[15%] text-center text-xl font-bold">
                        Dashboard
                    </div>
                    <div className="laptop:hidden flex w-1/2 h-[80%] justify-start items-center text-gray-800 relative">
                        <button type='button' className="text-xl p-2"  onClick={openSideNav}>
                            <span>
                                <FiMenu />
                            </span>
                        </button>
                        <span className="text-xl font-bold translate-x-2">Dashboard</span>
                    </div>
                    <div className="justify-end items-center w-1/2 flex h-[80%] p-2 ">
                        <div className="h-full flex justify-center -translate-x-4 items-center">
                            <span className="h-8 w-8 rounded-full  flex justify-center items-center bg-thirdcolor">
                                <IoMdNotificationsOutline />
                            </span>
                        </div>
                        <div className="h-full -translate-x-2 dropdown relative">
                            <button 
                                type='button'
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                className="dropdown-toggle transition duration-300 ease-in-out whitespace-nowrap flex h-full justify-center items-center">     
                                <span className="h-9 w-9 bg-gray-300 rounded-full flex justify-center items-center">
                                    <AiOutlineUser />
                                </span>
                                <div className="phone:hidden laptop:flex flex-col p-2 justify-center items-start h-8">
                                    <span className="text-[12px] font-bold mt-2"><span className="flex items-center">{localStorage.getItem('username')} <IoIosArrowDown /></span></span>
                                    <span className="text-xs -translate-y-1 text-gray-700">{localStorage.getItem('email')} </span>
                                </div>
                            </button>
                            <ul
                                className="index dropdown-menu min-w-max absolute duration-100 easy-in-out hidden bg-white text-base phone:z-100 z-50 phone:-translate-x-[75px] float-left text-left mt-5 bg-clip-padding  border-none mr-1/2"
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li>
                                    <button className="dropdown-item flex items-center text-sm py-3 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-200">
                                        <AiOutlineSetting/>
                                        <span className="ml-2">setting</span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={onLogout}
                                        className="flex items-center dropdown-item text-sm py-3 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-200 font-bold">
                                        <AiOutlineLogout />
                                        <span className="ml-2">Log out</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                </section>
                {/* end header*/}

                <div  ref={main} className="pt-8 w-full ml-4 absolute top-[10%] laptop:w-[80%] z-0 laptop:left-[18%]  text-gray-300 text-xs phone:flex-col h-full laptop:h-[90%] laptop:flex laptop:flex-row justify-around items-center">
                        <div className="laptop:w-[60%] phone:w-full flex flex-col laptop:justify-between h-full">
                            <div className="phone:h-24 smalltablet:h-28 tablet:h-40 phone:my-8 laptop:my-0 w-full laptop:h-[25%] flex justify-between ">
                                <div  className="w-[30%]  relative h-full bg-thirdcolor rounded-lg flex justify-center items-center">
                                    <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            Found by email
                                        </span>
                                        <hr className="border-4 font-bold border-green-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-3xl laptop:text-4xl text-blackcolor">
                                            0{/* { usernameStat.data ? `${usernameStat.data.data.total}` : 'loading...' } */}
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            0 faild <br/>
                                             <span className="text-amber-500">0 pending</span> <br />
                                             <span className="text-lime-500">0 success</span> <br />
                                         </span>
                                        <Link href="#"><span className="text-gray-500  block text-xl absolute bottom-1 right-1 flex items-center"><span className="text-xs mx-2 tablet:block phone:hidden ">see more</span><BsArrowRightCircle /></span></Link>
                                    </div>
                                </div>
                                <div  className="w-[30%]  relative  h-full bg-thirdcolor rounded-lg flex justify-center items-center">
                                    <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            Found by phone
                                        </span>
                                        <hr className="border-4 font-bold border-slate-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-3xl laptop:text-4xl text-blackcolor">
                                            { phoneStat.data ? `${phoneStat.data.data.total}` : '...' }
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            { phoneStat.data ? `${phoneStat.data.data.failed}` : '...' } faild <br/>
                                             <span className="text-amber-500">{ phoneStat.data ? `${phoneStat.data.data.pending}` : '...' } pending</span> <br />
                                             <span className="text-lime-500">{ phoneStat.data ? `${phoneStat.data.data.success}` : '...' } success</span> <br />
                                         </span>
                                        <Link href="#"><span className="text-gray-500  block text-xl absolute bottom-1 right-1 flex items-center"><span className="text-xs mx-2 tablet:block phone:hidden ">see more</span><BsArrowRightCircle /></span></Link>
                                    </div>
                                </div>
                                <div  className="w-[30%] relative h-full bg-thirdcolor rounded-lg flex justify-center items-center phone:-z-10 laptop:z-10">
                                <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            Found by username
                                        </span>
                                        <hr className="border-4 font-bold border-indigo-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-3xl laptop:text-4xl text-blackcolor">
                                            { usernameStat.data ? `${usernameStat.data.data.total}` : '...' }
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            { usernameStat.data ? `${usernameStat.data.data.failed}` : '...' } faild <br/>
                                             <span className="text-amber-500">{ usernameStat.data ? `${usernameStat.data.data.pending}` : '...' } pending</span> <br />
                                             <span className="text-lime-500">{ usernameStat.data ? `${usernameStat.data.data.success}` : '...' } success</span> <br />
                                         </span>
                                        <Link href="#"><span className="text-gray-500  block text-xl absolute bottom-1 right-1 flex items-center"><span className="text-xs mx-2 tablet:block phone:hidden ">see more</span><BsArrowRightCircle /></span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full laptop:h-[30%] phone:mb-8 laptop:mb-0 phone:h-72 bg-thirdcolor rounded-lg flex justify-center items-center ">Recent Activity</div>
                            <div className="w-full laptop:h-[35%] phone:mb-8 laptop:mb-0 phone:h-56 rounded-lg border-2 flex justify-center items-center">white div</div>
                        </div>
                        <div className="laptop:w-[30%]  phone:w-full laptop:h-full phone:h-72 laptop:h-full bg-thirdcolor rounded-lg flex flex-col">
                            <div className="w-full h-[20%] p-4  text-blackcolor">
                                <span className="text-2xl ">Users connected</span>
                                <hr className="w-1/3 border-2  border-gray-500"/>
                            </div>
                            <div className="w-full phone:h-[70%] phone:pt-5  tablet:pt-0 phone:flex phone:flex-col laptop:h-[70%] overflow-y-auto text-blackcolor">
                                {
                                    result.data  ? 
                                    ( 
                                        result.data.data?.map((session: any, key:any) => (
                                            <div className="w-full flex phone:justify-between laptop:justify-around items-center laptop:px-0 phone:px-4 mb-6" key={session.user?.id} >
                                                <button 
                                                    type='button'
                                                    className="dropdown-toggle transition duration-300 ease-in-out whitespace-nowrap flex h-full justify-center items-center">     
                                                    <span className="relative h-9 w-9 bg-gray-300 rounded-full flex justify-center items-center">
                                                        <AiOutlineUser />
                                                        <span className="absolute bottom-0 right-1 h-2 w-2 rounded-full bg-green-400"></span>
                                                    </span>
                                                    <div className="laptop:flex flex-col laptop:p-2 phone:px-4 justify-center items-start h-8">
                                                        <span className="text-[12px] font-bold mt-2"><span className="flex items-center">{session.user?.username}</span></span>
                                                        <span className="text-xs -translate-y-1 text-gray-700">{session.user?.firstname}</span>
                                                    </div>
                                                </button>
                                                <div className="dropup  relative">
                                                    <button 
                                                        type="button" 
                                                        id="dropdownMenuButton1s"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        className="text-sm cursor-pointer dropdown-toggle transition duration-150 ease-in-out whitespace-nowrap"><BsThreeDotsVertical/></button>
                                                    <ul
                                                        className="dropdown-menu min-w-max absolute duration-100 easy-in-out hidden bg-white text-base phone:z-100 z-50 phone:-translate-x-[75px] float-left text-left mt-5 bg-clip-padding  border-none mr-1/2"
                                                        aria-labelledby="dropdownMenuButton1s"
                                                    >
                                                        <li>
                                                            <button 
                                                                onClick={()=>onLogoutSession(session.id)}
                                                                className="flex items-center dropdown-item text-xs py-2 px-3  font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-200 font-bold">
                                                                <AiOutlineLogout />
                                                                <span className="ml-2">Log out</span>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))
                                    ): (
                                        <div className="text-center w-full">Loading sessions...</div>
                                    )
                                }
                            </div>
                        </div>
                </div>
            </section>
       </> 
    )
}
