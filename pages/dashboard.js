import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import ProtectedComponent from './protectedComponent'

export default function dashboard() {
    const {data,status}=useSession()
    useEffect(()=>{
        console.log({data,status});
    })
    return (
        <ProtectedComponent>
            <NavBar />
            <div className='min-h-screen bg-gray-300 text-center p-3'>
                dashboard<br/>
                {JSON.stringify(data)}
                {status}
            </div>
            <Footer />
        </ProtectedComponent>

    )
}
