import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from "react-hook-form"
import { useAuth } from "../layouts/AuthLayout"
import { generatePassword } from "../utils/utils"
import UserType from "../_types/User.type"
import { createUserSchema } from "../_validations/user.validation"

export default function Modal (props: any) {
    const {
        register,  
        formState:{ errors },
        handleSubmit
    } = useForm<UserType.createFields>({ resolver: joiResolver(createUserSchema)})


    const {register: registerAuth, isRegistering} = useAuth();

    const onCreateUser = async (data: any)=>{
        let token: string = props.token
        let password =  await generatePassword();
        data.password = password
        await registerAuth({data, token})
    }
    
    return(
        <>
            {/* Add User Modal */}
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
        </>
    )
}