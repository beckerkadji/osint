import { MutableRefObject, useEffect, useRef } from "react";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { getPhonestat, getSession, getUsernameStat, logoutSession } from "../../app/authApi/api";
import Header from "../../app/components/Header";
import React from 'react';
import { useRouter } from "next/router";
import { storage } from "../../app/utils/utils";


export default function Dashboard() {
    
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
                    <Header page={'Dashboard'}/>
                {/* end header*/}

                <div  ref={main} className="pt-8 w-full ml-4 absolute top-[10%] laptop:w-[80%] z-0 laptop:left-[18%]  text-gray-300 text-xs phone:flex-col h-full laptop:h-[90%] laptop:flex laptop:flex-row justify-around items-center">
                        <div className="laptop:w-[60%] phone:w-full flex flex-col laptop:justify-between h-full">
                            <div className="phone:h-24 smalltablet:h-28 tablet:h-40 phone:my-8 laptop:my-0 w-full laptop:h-[25%] flex justify-between ">
                                <div  className="w-[30%]  relative h-full bg-thirdcolor rounded-lg flex justify-center items-center">
                                    <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            By email
                                        </span>
                                        <hr className="border-4 font-bold border-green-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-2xl laptop:text-3xl text-blackcolor">
                                            0{/* { usernameStat.data ? `${usernameStat.data.data.total}` : 'loading...' } */}
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            0 faild <br/>
                                             <span className="text-amber-500">0 pending</span> <br />
                                             <span className="text-lime-500">0 success</span> <br />
                                         </span>
                                    </div>
                                </div>
                                <div  className="w-[30%]  relative  h-full bg-thirdcolor rounded-lg flex justify-center items-center">
                                    <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            By phone
                                        </span>
                                        <hr className="border-4 font-bold border-slate-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-2xl laptop:text-3xl text-blackcolor">
                                            { phoneStat.data ? `${phoneStat.data.data.total}` : '...' }
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            { phoneStat.data ? `${phoneStat.data.data.failed}` : '...' } faild <br/>
                                             <span className="text-amber-500">{ phoneStat.data ? `${phoneStat.data.data.pending}` : '...' } pending</span> <br />
                                             <span className="text-lime-500">{ phoneStat.data ? `${phoneStat.data.data.success}` : '...' } success</span> <br />
                                         </span>
                                    </div>
                                </div>
                                <div  className="w-[30%] relative h-full bg-thirdcolor rounded-lg flex justify-center items-center phone:-z-10 laptop:z-10">
                                <div className="flex flex-col w-full p-2"> 
                                        <span className="text-blackcolor text-xs">
                                            By username
                                        </span>
                                        <hr className="border-4 font-bold border-indigo-200 h-2 my-2 w-1/2"/>
                                        <span className="font-bold phone:text-xl tablet:text-2xl laptop:text-3xl text-blackcolor">
                                            { usernameStat.data ? `${usernameStat.data.data.total}` : '...' }
                                        </span>
                                        <span className="absolute tablet:block phone:hidden top-3 right-3 text-red-400 text-xs">
                                            { usernameStat.data ? `${usernameStat.data.data.failed}` : '...' } faild <br/>
                                             <span className="text-amber-500">{ usernameStat.data ? `${usernameStat.data.data.pending}` : '...' } pending</span> <br />
                                             <span className="text-lime-500">{ usernameStat.data ? `${usernameStat.data.data.success}` : '...' } success</span> <br />
                                         </span>
                                    </div>
                                </div>
                            </div>
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
