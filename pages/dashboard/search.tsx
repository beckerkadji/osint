import Tree from 'react-d3-tree';
import Link from "next/link";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineLogout, AiOutlineMail, AiOutlinePhone, AiOutlineSearch, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import React from 'react';
import { useRouter } from "next/router";
import { apiKey, storage } from "../../app/utils/utils";
import { useAuth } from "../../app/layouts/AuthLayout";
import { HiUsers } from "react-icons/hi";
import { CiLocationOn } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { useForm } from 'react-hook-form';
import UserType from '../../app/_types/User.type';
import { joiResolver } from '@hookform/resolvers/joi';
import { searchSchema } from '../../app/_validations/user.validation';
import { createSearch, search } from '../../app/authApi/api';
import { orgChat } from '../../app/utils/orgchat';
import Image from 'next/image';
import {  GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Map, Marker } from "pigeon-maps"



export default function Search() {

  
  const router = useRouter()
  const [userdata, setData] = useState<any>()
  const [load, setLoad] = useState<boolean>(false)
  const [displayMap, setDisplayMap] = useState<boolean>(false)
  const [org, setOrg] = useState<any>({});
  const [center, setCenter] = useState<any>([4.057083, 9.758146])
  const [zoom, setZoom] = useState(11)
  const [link, setLink] = useState<any>()

  const {
    register,  
    formState:{ errors },
    handleSubmit
    } = useForm<UserType.searchFields>({ resolver: joiResolver(searchSchema)})

  const token: any = localStorage.getItem('token')
  useEffect(()=>{
      if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
          router.push('/login')
        }
  }, [router])

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
          storage.clearData()
          router.push('/login')
      }else{
          toast.error(res.data.message)
      }
  }

  const onSearch = async (data: any) => {
    setLoad(true)
    let res: any = await search(data)
    if(res.data.data.length == 0){
        let res: any = await createSearch(data) 
        
        setTimeout( async()=>{
            res = await search(data)
            setLoad(false)
            setData(res.data)
            // let orgData = orgChat(userdata, data)
            // setOrg(orgData)
        }, 10000)
    }else{
        setData(res.data)
        setLoad(false)
        setDisplayMap(true)

        // let orgData = orgChat(userdata, data)
        // setOrg(orgData)
    }
  }
    return  (
       <>
            <section className="h-screen relative ">
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
                            <Link href={'/dashboard/search'}  className="h-12 w-full pl-4 text-left text-base block duration-300 hover:bg-gray-300 hover:text-gray-900 border-y-[1px] border-gray-700 flex items-center">
                                <AiOutlineSearch className="text-xl" /><span className="pl-5">Search</span>
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
                    <div className="h-full w-[20%] phone:hidden laptop:block ">
                        <div className="phone:hidden laptop:relative laptop:block h-full flex flex-col justify-between border-r-2 border-thirdcolor">
                            <div className="h-[13%] w-full flex justify-center items-center">
                                <span className="flex justify-center  items-center w-24 h-14">
                                    <span className="font-bold text-xl mr-2">LOGO</span>
                                </span>
                            </div>
                            <div className="h-[60%] w-full flex justify-center">
                                <div className="w-[80%]  text-gray-700 flex flex-col ">
                                <Link href={'/dashboard'}  className={` ${router.pathname == '/dashboard' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiFillDashboard /><span className="mx-2">Dashboard</span></Link>
                                <Link href={'/dashboard/users'}  className={` ${router.pathname == '/dashboard/users' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><HiUsers /><span className="mx-2" >Manage users </span></Link>
                                <Link href={'/dashboard/search'}  className={` ${router.pathname =='/dashboard/search' ? "bg-blackcolor text-whitecolor": null} focus:bg-blackcolor  text-sm rounded-lg focus:text-whitecolor active:bg-blackcolor active:text-whitecolor phone:px-3 phone:py-1 tablet:px-5 tablet:py-2 flex items-center my-2`}><AiOutlineSearch /><span className="mx-2">Search</span></Link>
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
                {/* end header*/}
                <div className="absolute phone:left-0 laptop:left-auto laptop:right-0 top-[15%] laptop:w-[83%] phone:w-full phone:h-screen w-[80%] z-0 left-[18%]  text-gray-300 text-xs phone:flex-col tablet:h-[90%] laptop:flex laptop:flex-row justify-end">
                    <div className="flex justify-end w-full laptop:w-full">
                        <div className="mb-3 w-full flex  flex-col  laptop:rounded-lg laptop:mx-2 text-white phone:justify-center phone:items-center tablet:justify-end items-end">
                            <div className='w-full flex justify-center'>
                                <form onSubmit={handleSubmit(onSearch)} className="input-group relative flex mt-2 phone:w-[95%]  tablet:w-1/2 phone:ml-0 flex-wrap w-1/2 items-stretch w-full mb-4">
                                    <input type="search" {...register('key')} className="form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blackcolor focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                                    <button className="btn inline-block px-6 py-3.5 bg-thirdcolor text-blackcolor font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blackcolor hover:text-white hover:shadow-lg focus:bg-blackcolor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blackcolor active:shadow-lg transition duration-150 ease-in-out flex items-center" type="submit" id="button-addon2" >
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>  
                            <div className="phone:w-full tablet:w-full h-screen">
                                {load ? 
                                    <div className='text-white bg-opacity-10 bg-gray-900 text-blackcolor laptop:rounded-lg flex justify-center items-center w-full h-full'>
                                        <div
                                            className="inline-block h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                            <span  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>
                                    </div> : 
                                    // <div  className='w-full h-full'>
                                    //     <Tree data={org} />             
                                    // </div>  
                                    <div>
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full text-center text-sm font-light">
                                                    <thead
                                                        className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-4">#</th>
                                                            <th scope="col" className=" px-6 py-4">Names</th>
                                                            <th scope="col" className=" px-6 py-4">Usernames</th>
                                                            <th scope="col" className=" px-6 py-4">images</th>
                                                            <th scope="col" className=" px-6 py-4">links</th>
                                                            <th scope="col" className=" px-6 py-4">address</th>
                                                            <th scope="col" className=" px-6 py-4">Phones</th>
                                                            <th scope="col" className=" px-6 py-4">Emails</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                            {
                                                                userdata?.data.map((item: any, key:number)=>(
                                                                    <tr className="border-b text-blackcolor" key={key}>
                                                                        <td className="whitespace-nowrap  px-6 py-4 font-medium">{key}</td>
                                                                        <td className="">{item.names?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                        <td className="">{item.usernames[0]}</td>
                                                                        <td className="whitespace-nowrap  px-6 flex  justify-between">{item.images?.map((item: any, key:any) => (
                                                                            <p className="w-[6rem] h-[4rem] relative " key={key}>
                                                                                <Link href={item} target='_blank'><Image src={item} alt="Logo"  fill /></Link>
                                                                            </p>
                                                                        ))}</td>
                                                                        <td className="whitespace-nowrap">
                                                                            <button 
                                                                                type="button"
                                                                                onClick={()=>setLink(item.links)}
                                                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                                                className="active:shadow-lg transition duration-150 ease-in-out right-0 top-[-3rem] px-3 py-2 bg-blackcolor rounded-sm w-24 text-whitecolor flex justify-between items-center text-xs"
                                                                            >
                                                                                Voir les liens
                                                                            </button>
                                                                        </td>
                                                                        <td className="">{item.addresses?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                        <td className="">{item.phones?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                        <td className="">{item.emails?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                    </tbody>
                                                    </table>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {
                                displayMap ?
                                <div className='h-full w-full phone:-translate-y-[15em] laptop:-translate-y-0'>
                                    <div>
                                        <Map height={300} center={center} defaultZoom={11}>
                                            <Marker width={50} anchor={center} />
                                        </Map>
                                    </div>
                                </div> :
                                <div>
                                    map here
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="staticBackdrop" tabIndex={2} data-bs-backdrop="none" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                                Liens associés à cette recherche
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className='flex flex-col text-blue-600'>
                                {link?.map((item: any, key:any) => (
                                    <p className="" key={key}>
                                        <Link href={item} target='_blank'>{item}</Link>
                                    </p>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
       </> 
    )
}
