import { useForm } from "react-hook-form"
import { joiResolver} from "@hookform/resolvers/joi"
import {BiHide, BiShow} from "react-icons/bi"
import Image from "next/image"
import { MutableRefObject, useEffect, useRef, useState } from "react"


import LoginType from "../app/_types/Login.type"
import { loginSchema } from "../app/_validations/login.validation"
import Link from "next/link"
import { useAuth } from "../app/layouts/AuthLayout"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { storage } from "../app/utils/utils"


function Login(){

    const router = useRouter()
    useEffect(()=>{
        if( localStorage.getItem('token') !== null &&  localStorage.getItem('token') !== 'undefined' ){
            router.push('/dashboard')
        }else{
            storage.clearData();
        }
    }, [router])

    console.log('token', localStorage.getItem('token'))

    const [isPassword, setIsPassword] = useState(false)
    const [visible, setVisible] = useState(false)
    const inputPassword = useRef() as MutableRefObject<HTMLInputElement>
    
    const CheckPassword = (e: any)=>{
        if(e.target.value === null || e.target.value === undefined || e.target.value === ''){
            setIsPassword(false)
        } else {
            setIsPassword(true)
        }
    }
    const showPassword = (e: any) => {
        e.preventDefault();
        if(inputPassword.current.type === "password"){
            setVisible(true); 
            inputPassword.current.type = "text"
        }else{
            setVisible(false);
            inputPassword.current.type ="password"
        } 
    }

    const {
        register,  
        formState:{ errors },
        handleSubmit
    } = useForm<LoginType.loginFields>({ resolver: joiResolver(loginSchema)})
    const { ref, ...rest} = register("password")

    const {login, isLoggingIn} = useAuth();

    const onLogin = async (data: any)=>{
        const res: any = await login(data)
        if(res.data.code === "success"){
            console.log("email here",res.data.data?.email)
            console.log("username here",res.data.data?.username)
            router.push({
                pathname: '/verifyotp',
                query: {
                    email: res.data.data?.email,
                    username: res.data.data?.username
                }
            },'/verifyotp')
        }
    }

    return (
        <section className="w-full h-[100vh] flex bg-thirdcolor">
            <div className="h-full phone:w-full  flex flex-col">
                <div className="w-full h-1/6 flex pl-5 items-center">
                    <Link href={'/'}>
                        <span className="large:w-1/5 phone:w-26 phone:h-[50%] w-36 h-2/3 ml-6 relative font-bold text-xl">
                            <Image src={'/logo.png'} alt='gendamerie nationale' width={60} height={60} />                    
                        </span>
                    </Link>
                </div>
                <div className="h-full w-full flex justify-center flex phone:mt-12 laptop:mt-1 justify-center items-start large:text-4xl">
                    <form onSubmit={handleSubmit(onLogin)} className="large:w-[800px]  bg-whitecolor desktop:border-none tablet:pb-5 phone:flex phone:flex-col tablet:h-[55%] phone:h-[65%] laptop:h-[85%]  phone:justify-between  large:justify-between w-[400px] h-[450px]  flex flex-col  pt-6">
                        <h2 className="text-large  w-full flex items-center justify-center font-bold phone:text-3xl text-gray-800 text-start mb-4 large:text-7xl translate-y-2">
                            <p className="w-4/5 m-0">Login</p>
                        </h2>
                        <p className="flex justify-center items-center w-full">
                            <span className="large:text-3xl w-4/5 text-xs w-full text-start text-gray-500">Welcome back! Please enter your details.</span>
                        </p>
                        <div className="w-full flex justify-center mt-4">
                            <div className="relative z-0 mb-6 w-2/3 phone:w-4/5 large:w-3/4 group">
                                <input
                                    type="text"  id="floating_username"
                                    className="block py-2 large:py-5 px-0 w-full large:text-4xl text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer" placeholder=" " required 
                                    {...register("username")}
                                />
                                <label htmlFor="floating_username" className="peer-focus:font-medium absolute  large:text-4xl text-sm text-gray-400 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Username</label>
                            </div>
                        </div>

                        <div className="w-full flex justify-center -translate-y-2">
                            <div className="relative z-0 mb-6 w-2/3 phone:w-4/5 large:w-3/4 group">
                                <input 
                                    type="password" 
                                    {...rest} 
                                    id="floating_password"
                                    onChange={CheckPassword}
                                    ref={(e: any) =>{ref(e); inputPassword.current = e}}
                                    className="block py-2 large:py-5 large:text-4xl px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                    placeholder=" " 
                                    required 
                                />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm  large:text-4xl text-gray-500 dark:text-gray-400 duration-200 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
                                <span className={`absolute ${isPassword == false? "hidden":null} right-2 inset-y-1/2`}>{visible == false ? <button onClick={showPassword} className="cursor-pointer -translate-y-2"><BiHide /></button> : 
                                <button onClick={showPassword}className="cursor-pointer -translate-y-2 "><BiShow/></button> }</span>
                            </div>
                        </div>
                        {/* <div className="w-full flex justify-center text-end -translate-y-5">
                            <span className="text-xs large:text-3xl phone:w-4/5  w-2/3 large:w-3/4 underline"><Link href="/forgot-password">Mot de passe oublié</Link></span>
                        </div> */}

                        <div className="w-full flex justify-center">
                            { isLoggingIn ?
                                <button disabled type="button" className="border-[1px] w-2/3 phone:w-4/5 large:w-3/4 text-white bg-gray-900 hover:bg-gray-900 focus:outline-none font-medium rounded-lg  large:text-4xl text-sm py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 large:py-4  dark:border-gray-700">
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                Loading...
                                </button>   
                            :
                                <button type="submit" className="border-[1px] w-4/5 phone:w-4/5 large:w-3/4 text-white bg-gray-900 hover:bg-gray-900 focus:outline-none font-medium rounded-lg  large:text-4xl text-sm py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 large:py-4  dark:border-gray-700">Log in</button>
                            }
                        </div>

                        <div className="text-red-500 translate-y-4 text-sm flex flex-col justify-center items-center">
                            {errors.username && <p>{errors.username.message}</p>}
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                    </form>
                </div>
            </div>

            {/* <div className="relative bg-gray-600 h-full phone:hidden desktop:block w-1/2">
                <div id="carouselExampleCaptions" className="carousel slide carousel-fade relative h-full" data-bs-ride="carousel">
                    <div className="carousel-inner  relative h-full w-full overflow-hidden">
                        <div className="carousel-item active relative float-left h-full w-full">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/slide1.jpg" 
                                    fill 
                                    priority
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    className="absolute b brightness-60 block w-full" alt="..."
                                 />    
                            </div>
                        <div className="carousel-caption  md:block top-2/3 absolute">
                            <h5 className="text-4xl fond-bold mb-8">First slide label</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, 
                                adipisicing elit. Dicta tempore consequuntur quibusdam !
                            </p>
                        </div>
                    </div>

                    {/* Slider 2 
                    <div className="carousel-item relative float-left h-full w-full">
                        <div className="relative w-full h-full">
                            <Image 
                                src="/slide2.jpg" 
                                fill 
                                priority
                                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                className="absolute block brightness-60 w-full" 
                                alt="..." />    
                        </div>
                        <div className="carousel-caption md:block absolute  top-2/3 ">
                            <h5 className="text-4xl fond-bold mb-8">Second slide label</h5>
                            <p>
                                perferendis quidem. Dolore,in fugit eveniet excepturi ipsam illum distinctio.
                            </p>
                        </div>
                    </div>

                    </div>
                </div>
            </div>*/} 
            
        </section>  
    )
}

export default Login