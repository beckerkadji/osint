 import Link from "next/link";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import React from 'react';
import { useRouter } from "next/router";
import { storage } from "../../app/utils/utils";
import { useForm } from 'react-hook-form';
import UserType from '../../app/_types/User.type';
import { joiResolver } from '@hookform/resolvers/joi';
import { searchSchema } from '../../app/_validations/user.validation';
import { createSearch, googleSearch, search } from '../../app/authApi/api';
import { phoneCheck } from '../../app/utils/utils';
import Header from '../../app/components/Header';


export default function Search() {

  const phoneDiv = useRef() as MutableRefObject<HTMLDivElement>
  const usernameDiv = useRef() as MutableRefObject<HTMLDivElement>
  
  const router = useRouter()
  const [userdata, setData] = useState<any>()
  const [usernameData, setUsernameData] = useState<any>()
  const [loadUsername, setLoadUsername] = useState<boolean>(false)

  useEffect( ()=> {
    usernameDiv.current.classList.add('hidden')
  }, [router])
  
  const {
    register,  
    formState:{ errors },
    handleSubmit
    } = useForm<UserType.searchFields>({ resolver: joiResolver(searchSchema)})

  const token: any = localStorage.getItem('token')
  useEffect(()=>{
      if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
          storage.removeToken()
          storage.clearData()
          router.push('/login')
        }
  }, [router])
   


  const onSearch = async (data: any) => {
    if(!phoneCheck.test(data.key)){
        setLoadUsername(true)
        if(!phoneDiv.current?.classList.contains('hidden')){
            phoneDiv.current?.classList.add('hidden')
        }
        usernameDiv.current?.classList.remove('hidden')
        let res: any = await googleSearch(data)
        setLoadUsername(false)
        setUsernameData(res.data.data)
    }else{
        if(!usernameDiv.current?.classList.contains('hidden')){
            usernameDiv.current?.classList.add('hidden')
        }
        phoneDiv.current?.classList.remove('hidden')
        let res: any = await search(data)
        if(res.data.data.length == 0){
            let res: any = await createSearch(data) 
            
            setTimeout( async()=>{
                res = await search(data)
                setData(res.data)
            }, 10000)
        }else{
            setData(res.data)
        }
    }
  }
    return  (
       <>
            <section className="h-screen relative ">
                {/* <Header /> */}
                    <Header page={'Google search '}/>
                {/* end header*/}
                <div className="search absolute phone:overflow-auto laptop:overflow-scroll desktop:w-[80%] phone:left-0 laptop:left-auto laptop:right-0 top-[15%] laptop:w-[83%] phone:w-full phone:h-screen w-[80%] z-0 left-[18%]  text-gray-300 text-xs phone:flex-col tablet:h-[90%] laptop:flex laptop:z-0 laptop:flex-row justify-end">
                    <div className="flex justify-end w-full laptop:w-full">
                        <div className="relative mb-0 w-full flex  flex-col  laptop:rounded-lg laptop:mx-2 text-white phone:justify-center phone:items-center tablet:justify-end items-end">
                            <div className='w-full flex justify-center mb-4'>
                                <form onSubmit={handleSubmit(onSearch)} className="input-group relative flex mt-2 phone:w-[95%]  tablet:w-1/2 phone:ml-0 flex-wrap w-1/2 items-stretch w-full mb-0">
                                    <input type="search" {...register('key')}  className="usernamesearch form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" placeholder="Exemple: @key; key; text text" aria-label="Search" aria-describedby="button-addon2" />
                                    <button className="btn inline-block px-6 py-3.5 bg-thirdcolor text-blackcolor font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blackcolor hover:text-white hover:shadow-lg focus:bg-blackcolor focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blackcolor active:shadow-lg transition duration-150 ease-in-out flex items-center" type="submit" id="button-addon2" >
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </button>
                                </form>
                            </div>  
                            <div className="phone:w-full tablet:w-full h-screen">
                                {loadUsername ? 
                                    <div className='text-white bg-opacity-10 bg-gray-900 text-blackcolor laptop:rounded-lg flex justify-center items-center w-full h-full'>
                                        <div
                                            className="inline-block  border-blackcolor h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                            <span  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>
                                    </div> : 
                                    <div ref={usernameDiv}>
                                        <div className="flex flex-col">
                                            <div className="sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 absolute top-[50px]">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full text-center text-sm font-light">
                                                    <thead
                                                        className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-4">#</th>
                                                            <th scope="col" className=" px-6 py-4">title</th>
                                                            <th scope="col" className=" px-6 py-4">url</th>
                                                            <th scope="col" className=" px-6 py-4">description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                            {
                                                                usernameData?.result?.organic_results.map((item: any, key:number)=>(
                                                                    <tr className="border-b text-blackcolor" key={key}>
                                                                        <td className="whitespace-nowrap bg-gray-100  px-6 py-4 font-medium">{key}</td>
                                                                        <td className="px-6 w-[200px]">{item.title}</td>
                                                                        <td className="bg-gray-100 text-blue-500"><Link href={item.url} target="_blank">{item.url}</Link></td>
                                                                        <td className="whitespace-nowrap  px-6 flex  justify-between">{item.description}</td>
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
                        </div>
                    </div>
                </div>
            </section>

       </> 
    )
}
