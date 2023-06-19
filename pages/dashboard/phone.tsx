import Link from "next/link";
import { MutableRefObject, useRef, useEffect, useState } from "react";
import React from 'react';
import { useRouter } from "next/router";
import { storage } from "../../app/utils/utils";
import { useForm } from 'react-hook-form';
import UserType from '../../app/_types/User.type';
import { joiResolver } from '@hookform/resolvers/joi';
import { searchSchema } from '../../app/_validations/user.validation';
import { createSearch, search, searchUsername } from '../../app/authApi/api';
import Image from 'next/image';
import { Map, Marker } from "pigeon-maps"
import { phoneCheck } from '../../app/utils/utils';
import Header from '../../app/components/Header';


export default function Search() {

  const phoneDiv = useRef() as MutableRefObject<HTMLDivElement>
  const usernameDiv = useRef() as MutableRefObject<HTMLDivElement>
  
  const router = useRouter()
  const [userdata, setData] = useState<any>()
  const [usernameData, setUsernameData] = useState<any>()
  const [loadUsername, setLoadUsername] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [displayMap, setDisplayMap] = useState<boolean>(false)
  const [center, setCenter] = useState<any>([4.057083, 9.758146])
  const [link, setLink] = useState<any>()
  const [moment, setMoment] = useState<any>();

  useEffect( ()=> {
    phoneDiv.current.classList.add('hidden')
    usernameDiv.current.classList.add('hidden')
  }, [router])
  
  const {
    register,  
    formState:{ errors },
    handleSubmit
    } = useForm<UserType.searchFields>({ resolver: joiResolver(searchSchema)})

  useEffect(()=>{
      if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
          storage.removeToken()
          storage.clearData()
          router.push('/login')
        }
  }, [router])
  
  const changeMap = (long: any, lat:any, moment: any) =>{
    setDisplayMap(false)
    setMoment(moment)
    setCenter([lat, long])
    setDisplayMap(true)
  }

  const onSearch = async (data: any) => {
    // if(!phoneCheck.test(data.key)){
    //     setDisplayMap(false)
    //     setLoadUsername(true)
    //     if(!phoneDiv.current?.classList.contains('hidden')){
    //         phoneDiv.current?.classList.add('hidden')
    //     }
    //     usernameDiv.current?.classList.remove('hidden')
    //     let res: any = await searchUsername(data)
    //     setLoadUsername(false)
    //     setUsernameData(res.data)
    // }else{
        setDisplayMap(false)
        setLoad(true)
        if(!usernameDiv.current?.classList.contains('hidden')){
            usernameDiv.current?.classList.add('hidden')
        }
        phoneDiv.current?.classList.remove('hidden')
        let res: any = await search(data)
        if(res.data.data.length == 0){
            let res: any = await createSearch(data) 
            
            setTimeout( async()=>{
                res = await search(data)
                setLoad(false)
                setData(res.data)
            }, 10000)
        }else{
            setData(res.data)
            setLoad(false)
        }
    }

    return  (
       <>
            <section className="h-screen relative ">
                {/* <Header /> */}
                    <Header page={'Phone search'}/>
                {/* end header*/}
                <div className="search absolute phone:overflow-auto laptop:overflow-scroll desktop:w-[80%] phone:left-0 laptop:left-auto laptop:right-0 top-[15%] laptop:w-[83%] phone:w-full phone:h-screen w-[80%] z-0 left-[18%]  text-gray-300 text-xs phone:flex-col tablet:h-[90%] laptop:flex laptop:z-0 laptop:flex-row justify-end">
                    <div className="flex justify-end w-full laptop:w-full">
                        <div className="relative mb-0 w-full flex  flex-col  laptop:rounded-lg laptop:mx-2 text-white phone:justify-center phone:items-center tablet:justify-end items-end">
                            <div className='w-full flex justify-center mb-4'>
                                <form onSubmit={handleSubmit(onSearch)} className="input-group relative flex mt-2 phone:w-[95%]  tablet:w-1/2 phone:ml-0 flex-wrap w-1/2 items-stretch w-full mb-0">
                                    <input type="search" {...register('key')} className="phonesearch form-control  relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white" placeholder="exemple: 23760000000" pattern="[0-9]+" aria-label="Search" aria-describedby="button-addon2" />
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
                                    <div ref={phoneDiv}>
                                        <div className="flex flex-col">
                                            <div className="sm:-mx-6 lg:-mx-8">
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
                                                                        <td className="whitespace-nowrap bg-gray-100  px-6 py-4 font-medium">{key}</td>
                                                                        <td className="">{item.names?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                        <td className="bg-gray-100">{item.usernames && item.usernames[0]}</td>
                                                                        <td className="whitespace-nowrap  px-6 flex  justify-between">{item.images?.map((item: any, key:any) => (
                                                                            <p className="w-[6rem] h-[4rem] relative " key={key}>
                                                                                <Link href={item} target='_blank'><Image src={item} alt="Logo"  fill /></Link>
                                                                            </p>
                                                                        ))}</td>
                                                                        <td className="whitespace-nowrap bg-gray-100">
                                                                            <p className='h-full flex justify-center'>
                                                                                <button 
                                                                                    type="button"
                                                                                    onClick={()=>setLink(item.links)}
                                                                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                                                    className="active:shadow-lg transition duration-150 ease-in-out right-0 top-[-3rem] px-3 py-2 bg-blackcolor rounded-sm w-24  text-gray-400 flex justify-between items-center text-xs"
                                                                                >
                                                                                    Voir les liens
                                                                                </button>
                                                                            </p>
                                                                        </td>
                                                                        <td className="">{item.addresses?.map((item: any, key:any) => (
                                                                            <p key={key}>{item}</p>
                                                                        ))}</td>
                                                                        <td className="bg-gray-100">{item.phones?.map((item: any, key:any) => (
                                                                            <p key={key} className=''>
                                                                                <p>phones :{item.id}</p>
                                                                                {item.imeis.length > 0 && <p>Imeis :{item.imeis.map((item: any, key:any) => (
                                                                                    <p key={key}>
                                                                                        {item.imei?.id}
                                                                                        <p className='flex flex-col items-center'>Locations : {item.imei.locations.map((item:any, key: any)=> (
                                                                                            <p key={key}>
                                                                                                <button 
                                                                                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop2"
                                                                                                    className="active:shadow-lg transition duration-150 ease-in-out right-0  px-3 py-2 bg-blackcolor rounded-sm m-2 text-gray-400 flex justify-between items-center text-xs"
                                                                                                    onClick={()=> {
                                                                                                        changeMap(item.long, item.lat, item.moment)
                                                                                                        }
                                                                                                    }>
                                                                                                    {item.moment}
                                                                                                </button></p>
                                                                                        ))}</p>
                                                                                    </p>
                                                                                ))}</p>}
                                                                            </p>
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

                                {loadUsername ? 
                                    <div className='text-white bg-opacity-10 bg-gray-900 text-blackcolor laptop:rounded-lg flex justify-center items-center w-full h-full'>
                                        <div
                                            className="inline-block h-20 w-20 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                            <span  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>
                                    </div> :
                                    <div ref={usernameDiv} className='relative'>
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 absolute top-[80px]">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full overflow-x-auto text-center text-sm font-light">
                                                    <thead
                                                        className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                                        <tr>
                                                            <th scope="col" className=" px-6 py-4">#</th>
                                                            <th scope="col" className=" px-6 py-4">Network</th>
                                                            <th scope="col" className=" px-6 py-4">type</th>
                                                            <th scope="col" className=" px-6 py-4">url</th>
                                                            <th scope="col" className=" px-6 py-4">description</th>
                                                            <th scope="col" className=" px-6 py-4">images</th>
                                                            <th scope="col" className=" px-6 py-4">date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            usernameData?.data?.posts?.map((item:any, key:any) => (
                                                                <tr className="border-b text-blackcolor p-2 h-10" key={key}>
                                                                    <td>{key+1}</td>
                                                                    <td>{item.network}</td>
                                                                    <td>{item.type}</td>
                                                                    <td> {item.url && <Link href={item.url} target='_blank' className="hover:text-gray-600">{item.url}</Link>}</td>
                                                                    <td>{item.text}</td>
                                                                    <td></td>
                                                                    <td></td>
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

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="staticBackdrop" tabIndex={2} data-bs-backdrop="none" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xs relative w-auto pointer-events-none ">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-blackcolor bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0  items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal uppercase text-whitecolor" id="exampleModalScrollableLabel">
                                Liens associés à cette recherche
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-5 h-5 p-1 text-whitecolor border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className='flex flex-col justify-center text-gray-300 transition ease-in-out'>
                                {link?.map((item: any, key:any) => (
                                    <p  key={key} className='p-2'>
                                        <Link href={item} target='_blank' className="hover:text-gray-600">{item}</Link>
                                    </p>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                id="staticBackdrop2" tabIndex={2} data-bs-backdrop="none" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl relative w-auto pointer-events-none ">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-blackcolor bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0  items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal uppercase text-whitecolor" id="exampleModalScrollableLabel">
                                Map position for : {moment}
                            </h5>
                            <button type="button"
                            className="btn-close box-content w-5 h-5 p-1 text-whitecolor border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className='flex flex-col justify-center text-gray-300 transition ease-in-out'>
                                <div className='h-full w-full phone:-translate-y-[15em] laptop:-translate-y-0'>
                                    <div>
                                        <Map height={450} center={center} defaultZoom={11}>
                                            <Marker width={50} anchor={center} />
                                        </Map>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


       </> 
    )
}
