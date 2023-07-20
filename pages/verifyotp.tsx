import { joiResolver } from "@hookform/resolvers/joi"
import { useRouter } from "next/router"
import React, { useEffect, useState ,useRef, MutableRefObject}  from "react"
import { useForm } from "react-hook-form"
import { CiLock } from "react-icons/ci"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import OtpInput from "react18-input-otp"
import { loginResendOtp, loginVerifyOtp } from "../app/authApi/api"
import { storage } from "../app/utils/utils"
import LoginType from "../app/_types/Login.type"
import { verifyOtpSchema } from "../app/_validations/verify.otp.validation"


function VerifyOtp(){

    const router = useRouter()

    let userEmail: any = router.query.email
    let userName: any = router.query.username
    const localEmail : any = userEmail;
    const [disabled, setDesabled] = useState(true)
    const [username, setUsername] = useState('')
    const [otp, setOtp] = useState<any>();
    const inputOtp = useRef() as MutableRefObject<HTMLInputElement>

    const handleChange = (value: any) => {
       let newValue = Number(value)
        setOtp(newValue);
    }
    
    useEffect(()=>{
        if(userEmail == null){
            router.push('/login')
          }
    }, [router, userEmail])

    const {
        register,
        setValue,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginType.verifyOtp>({ resolver: joiResolver(verifyOtpSchema)})
    
    const { ref, ...rest} = register("otp")


    const {isLoading: isloadingVerifyOtp, mutateAsync: mutateAsyncLoginVerify} = useMutation(async (data: any)=>{
        const res: any = await loginVerifyOtp(data)
        setUsername(data.username)
        setDesabled(false)
        if (res.data.code === "success"){
            const userdata = Object.entries(res.data.data)
            storage.setToken(res.data.token)
            storage.setData(userdata)
            toast.success(res.data.message)
            router.push('/dashboard')
        } else {
            toast.error(res.data.message)
        }
        return res
    })

    const onLoginVerifyOtp = async (data : any) =>{
        await mutateAsyncLoginVerify(data)
    }
    
    const {isLoading: isresentOtpLogin, mutateAsync: mutateAsyncLoginResentOpt} = useMutation(async (data: any) =>{
        const res =  await loginResendOtp({username})
        setDesabled(true)

        return res
    })
    
    const loginResend =  async (data: any) =>{
        const res = await mutateAsyncLoginResentOpt(data) 
        if(res.data.code === "success"){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }   
    }

    return(
        <section className="w-full h-[100vh] phone:bg-white tablet:bg-thirdcolor flex justify-center items-center text-[#262626]">
        <div className="w-[350px] h-[500px]  flex items-center w-full">
                <form onSubmit={handleSubmit(onLoginVerifyOtp)} className="bg-white w-full h-[85%]" >
                    <div className="h-[35%] flex justify-center items-center">
                        <p className="border-2 border-blackcolor w-20 h-20 rounded-full flex justify-center items-center text-3xl text-blackcolor"><CiLock/></p>
                    </div>
                    <div className="flex w-full text-sm mb-8 justify-center items-center">
                        <p className="text-center">Saisir le code envoyé à l'adresse:<br/> <span className="font-bold">{localEmail}</span></p>
                    </div>

                    <div className="hidden w-full flex justify-center ">
                            <div className="relative z-0 mb-6 w-2/3 phone:w-4/5 large:w-3/4 group">
                                <input
                                    type="text"  id="floating_username"
                                    value={userName}
                                    className="inputtype block py-2 large:py-5 px-0 w-full large:text-4xl translate-y-[5px] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer" placeholder=" " required 
                                    {...register("username")}
                                />
                                <label htmlFor="floating_username" className="peer-focus:font-medium absolute  large:text-4xl text-sm text-gray-400 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">email</label>
                            </div>
                    </div>
       
                    <div className="w-full flex justify-center mt-4">
                            <div className="flex justify-center items-center z-0 mb-6 w-2/3 phone:w-4/5 large:w-3/4 group">
                                <OtpInput
                                    value={otp}
                                    className="otpinput block w-full px-2 large:text-4xl translate-y-[5px] text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                    isInputNum
                                    shouldAutoFocus
                                    {...rest}
                                    onChange={handleChange}
                                    ref={(e: any) =>{ref(e); setValue("otp", otp) ; inputOtp.current = e}}
                                    numInputs={6} 
                                    isInputSecure
                                    separator={<span></span>}
                                />
                            </div>
                    </div>

                    <div className="w-full flex justify-center mt-4">
                            { isloadingVerifyOtp ?
                                <button disabled type="button" className="border-[1px] w-2/3 phone:w-4/5 large:w-3/4 text-white bg-gray-900 hover:bg-gray-900 focus:outline-none font-medium rounded-lg  large:text-4xl text-sm py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 large:py-4  dark:border-gray-700">
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                Loading...
                                </button>   
                            :
                                <button type="submit"disabled={isresentOtpLogin ? true: false} className={`${isresentOtpLogin ? "opacity-60": null} border-[1px] w-4/5 phone:w-4/5 large:w-3/4 text-white bg-gray-900 hover:bg-gray-900 focus:outline-none font-medium rounded-lg  large:text-4xl text-sm py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 large:py-4  dark:border-gray-700`}>Confirmer</button>
                            }
                        </div>
                    <div className="text-red-500 translate-y-4 flex mb-4 justify-center items-center">
                        {errors.username && <span>{errors.username.message}</span>}
                        {errors.otp && <span>{errors.otp.message}</span>}
                    </div>
                    <div className="flex justify-center text-xs translate-y-1">
                        {  isresentOtpLogin ?
                            <button disabled className="text-blackcolor spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                <span className="visually-hidden">Loading...</span>
                            </button>
                            :
                            <button disabled={disabled} onClick={loginResend} className= "cursor-pointer">Renvoyé le code</button>
                        }
                    </div>
                </form> 
        </div>
        
        </section>
    )
}

export default VerifyOtp