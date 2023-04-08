import Image from "next/image"
import {  useEffect, useState } from "react"

import { useRouter } from "next/router"
import axios from "axios"

const url = process.env.EMAIL_SERVICE || 'http://localhost:8080/api/'

function Sendip(){
    //creating IP state
    // const [ip,setIp] = useState('');
    // const router = useRouter();
    
    //creating function to load ip address from the API
    // const getData = async()=>{
    //     const res = await axios.get('https://geolocation-db.com/json/')  
    //     setIp(res.data.IPv4);

    //     //send to api
    //     console.log('ip public is: ', ip);
    //     console.log('request id is: ', router.query.requestid);

    //     let sendIpToBackend = await axios.post(`${url}mail/geoip`, {
    //         ip: ip,
    //         requestId: router.query.requestid
    //         })
    //         console.log(sendIpToBackend.data)
    // }


    //  useEffect(()=>{
    //     if(!router.isReady && ip) return;
    //      //passing getData method to the lifecycle method
    //     console.log("is ready ? ",router.isReady) 
    //      getData()
    //  },[router.isReady, ip, getData])


    return (
        <section className="w-full h-[100vh] flex bg-thirdcolor">
            <div className="h-full phone:w-full  flex flex-col">
                <div className="w-full h-1/6 flex items-center">
                    <span className="large:w-1/5 phone:w-26 phone:h-[50%] w-24 h-2/3 ml-6 relative">
                        OSINT-GN
                    </span>
                </div>
                <div className="h-full w-full border-2 justify-center flex-col ites-center phone:mt-12 laptop:mt-1  large:text-4xl">
                    <p>public ip: {'test'}</p>
                    <p>request Id: {'test'}</p>
                </div>
            </div>
        </section>  
    )
}

export default Sendip