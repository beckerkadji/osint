import Image from "next/image";
import Link from "next/link";
import { storage } from "../app/utils/utils";


export default function Home() {
    return (
        <div className="w-screen h-screen bg-gradient-to-r from-gray-300 to-gray-100 flex flex-col items-center"> 
            <h1 className="uppercase text-blackcolor text-4xl mt-[60px] text-center p-4 font-bold mt-10 mb-10">Welcome to OSINT-GN</h1>
            <Image src={'/logo.png'} alt='logo gendamerie nationale m' width={100} height={100}/>
            <Link href={'/login'}> <button className="bg-blackcolor py-4 px-6 text-whitecolor uppercase rounded-sm mt-4">login</button></Link>
        </div>
    )

}
