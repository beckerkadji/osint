import { MutableRefObject, useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit} from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { deleteUser, getAllUser} from "../../app/authApi/api";
import React from 'react';
import { FaUserPlus } from "react-icons/fa";
import TableHeader from "../../app/components/Datatable/TableHeader";
import Pagination from "../../app/components/Datatable/Pagination";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Header from "../../app/components/Header";
import UpdateModal from "../../app/components/UpdateModal";
import Modal from "../../app/components/Modal";
import { storage } from "../../app/utils/utils";



export default function Users() {

    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem('token') === "undefined" || localStorage.getItem('token') === null ){
            storage.removeToken()
            storage.clearData()
            router.push('/login')
        }
        
    }, [router])

    console.log(localStorage.getItem('role_id'))


    const usertable = useRef() as MutableRefObject<HTMLDivElement>
    const [currentPage, setCurrentPage] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [user, setUser] = useState<any>()
    const [validToken, setValidToken] = useState<boolean>(true)
    const ItemPerPage = 5   
    const token: any = localStorage.getItem('token')

    const userData = useQuery("userList", async () => {
        const response = await getAllUser(token)
        if(response.data.code == 'not_authorized'){
            setValidToken(false)
            storage.clearData()
            router.push('/login')
        }
        return response.data.data
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
                                            userData.data && validToken == true &&
                                            (
                                                localStorage.getItem('role_id') == '1' ||
                                                localStorage.getItem('role_id') == '2' ||
                                                localStorage.getItem('role_id') == '3'
                                            )
                                            ? 
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
            <Modal token={token}/>

            {/* Update User Modal */}
            <UpdateModal token={token} data={user} />
       </> 
    )
}
