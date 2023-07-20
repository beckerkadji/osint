import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useRef } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineLogout,AiOutlineGoogle, AiOutlinePhone, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuth } from "../layouts/AuthLayout";
import { storage } from "../utils/utils";

export default function Header (props: any){

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
                    <AiOutlinePhone className="text-xl" /><span className="pl-5">Phone</span>
                </Link> 
                <Link href={'/dashboard/googlesearch'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                    <AiOutlineGoogle className="text-xl" /><span className="pl-5">Googlesearch</span>
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
                    <div className="h-[13%] w-full flex relative">
                        <span className="logo flex items-center w-1/2 h-14 absolute top-3 ml-[10%]">
                            <Image src={'/logo.png'} alt='logo gendamerie nationale' width={50} height={50}/>
                            <span className="font-bold text-sm mr-2 text-logocolor">OSINT</span>
                        </span>
                    </div>
                    <div className="h-[60%] w-full flex justify-center">
                        <div className="w-[80%]  text-gray-700 flex flex-col ">
                        <Link href={'/dashboard'}  className={` ${router.pathname == '/dashboard' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiFillDashboard /><span className="mx-2">Dashboard</span></Link>
                        <Link href={'/dashboard/users'}  className={` ${router.pathname == '/dashboard/users' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><HiUsers /><span className="mx-2" >Manage users </span></Link>
                        <Link href={'/dashboard/username'}  className={` ${router.pathname =='/dashboard/username' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlineSearch /><span className="mx-2">Username</span></Link>
                        <Link href={'/dashboard/phone'}  className={` ${router.pathname =='/dashboard/phone' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlinePhone /><span className="mx-2">Phone</span></Link>
                        <Link href={'/dashboard/googlesearch'}  className={` ${router.pathname =='/dashboard/googlesearch' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlineGoogle /><span className="mx-2">Google search</span></Link>
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
                <div className="phone:hidden laptop:block w-[35%] phone:text-center laptop:text-start laptop:px-4 text-xl font-bold">
                    {props.page}
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
    )
}