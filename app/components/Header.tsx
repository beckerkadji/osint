import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useRef } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineLogout, AiOutlineMail, AiOutlinePhone, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuth } from "../layouts/AuthLayout";
import { storage } from "../utils/utils";

export default function Header (){

    const router = useRouter()
    const sideNavBar = useRef() as MutableRefObject<HTMLDivElement>
   
    const {logout} = useAuth()
    const token: any = localStorage.getItem('token')
    
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
            storage.clearData()
            router.push('/login')
        }else{
            toast.error(res.data.message)
        }
    }
    

    return (
        <>
            <section className="flex h-screen w-full relative z-100 h-full">
                    <div id="mySideNav" ref={sideNavBar} className="h-full w-0 laptop:hidden  duration-500 opacity-0 fixed z-10 top-0 left-0 overflow-x-hidden pt-14 duration-500 bg-blackcolor text-whitecolor">
                        <button onClick={closeSideNav} className="absolute top-4 text-gray-300 right-6 text-xl ml-12"><AiOutlineClose /></button> 
                        <Link href={'/dashboard'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center" >
                            <AiFillDashboard className="text-xl" /><span className="pl-5">Dashboard</span>
                        </Link> 
                        <Link href={'/dashboard/users'} className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                            <HiUsers className="text-xl" /><span className="pl-5">Manage users</span>
                        </Link>
                        <Link href={'/dashboard/search'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                            <AiOutlineMail className="text-xl" /><span className="pl-5">Search</span>
                        </Link>  
                    </div>
                <div className="h-full w-[20%] phone:hidden laptop:block ">
                    <div className="phone:hidden laptop:relative laptop:block h-full flex flex-col justify-between border-r-2 border-thirdcolor">
                        <div className="h-[13%] w-full flex justify-center items-center">
                            <span className="flex justify-center  items-center w-24 h-14">
                                <span className="font-bold text-xl mr-2">LOGO</span>
                            </span>
                        </div>
                        <div className="h-[60%] w-full flex justify-center">
                            <div className="w-[100%]  text-gray-700 flex flex-col  items-start">
                            <Link href={'/dashboard'}  className={` ${router.pathname == '/dashboard' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiFillDashboard /><span className="mx-2">Dashboard</span></Link>
                            <Link href={'/dashboard/users'}  className={` ${router.pathname == '/dashboard/users' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><HiUsers /><span className="mx-2" >Manage users </span></Link>
                            <Link href={'/dashboard/search'}  className={` ${router.pathname =='/dashboard/search' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlineMail /><span className="mx-2">Search</span></Link>
                            </div>
                        </div>
                        <div className="h-[10%] absolute bottom-5 w-full flex justify-center items-center self-end ">
                            <button
                             onClick={onLogout}
                            className="flex items-center">
                                <AiOutlineLogout />
                                <span className="ml-2 text-xs cursor-pointer">Log out</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-[13%] phone:w-full flex items-center justify-between">
                    <div className="phone:hidden laptop:block ml-4 w-[15%] text-center text-xl font-bold">
                        Dashboard
                    </div>
                    <div className="laptop:hidden translate-x-5 flex w-1/2 h-[80%] justify-start items-center text-gray-800 relative">
                        <button type='button' className="text-xl p-2"  onClick={openSideNav}>
                            <span>
                                <FiMenu />
                            </span>
                        </button>
                        <span className="text-xl font-bold translate-x-2">Dashboard</span>
                    </div>
                    <div className="justify-end items-center w-1/2 flex h-[80%] p-2 ">
                        <div className="h-full flex justify-center -translate-x-9 items-center">
                            <span className="h-8 w-8 rounded-full  flex justify-center items-center bg-thirdcolor">
                                <IoMdNotificationsOutline />
                            </span>
                        </div>
                        <div className="h-full -translate-x-6 dropdown relative">
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
                                className="dropdown-menu min-w-max absolute duration-100 easy-in-out hidden bg-white text-base phone:z-100 z-50 phone:-translate-x-[75px] float-left text-left mt-5 bg-clip-padding  border-none mr-1/2"
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
        </>
    )
}