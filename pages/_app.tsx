import type { AppProps } from 'next/app'
import {ReactQueryDevtools} from "react-query/devtools"
import {QueryClient, QueryClientProvider} from 'react-query' 
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';

import { Progress } from '../app/components/Progress'

import { AuthProvider } from '../app/layouts/AuthLayout'
import { MainLayout } from '../app/layouts/MainLayout'


import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps, router }: AppProps) {
    Progress()
      //tailwind element config
        useEffect(()=> {
            const use = async () => {
            // @ts-ignore
            (await import('tw-elements')).default;
            };
            use();
        },[]);

    const queryClient = new QueryClient()
    const authPage = ['/login', '/verifyotp', '/loginuser','/sendip', '/dashboard', '/dashboard/search','/dashboard/username','/dashboard/phone', "/dashboard/users", "/dashboard/googlesearch"].includes(router.pathname)

    return authPage ? (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Component {...pageProps} />
                <ToastContainer />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </QueryClientProvider>
    ) : (
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
    )
}