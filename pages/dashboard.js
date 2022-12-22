import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import ProtectedComponent from './protectedComponent'

export default function dashboard() {
    const { data, status } = useSession()

    if (status == "loading") {
        return <h1 className='min-h-screen text-black flex flex-1 flex-col items-center justify-center px-20 text-center bg-gray-300'>Loading...</h1>
    }

    const btnHandler = () => {
        setTimeout(() => {
            alert("kalooo!!!!")
          }, 5000);
    }

    return (
        <ProtectedComponent>
            {/* <Auth> */}
            <NavBar />
            <div className='min-h-screen bg-gray-300 text-center p-3'>
                dashboard<br />
                {JSON.stringify(data)}
                {status}
                <button onClick={btnHandler} className='bg-orange-300 text-white px-3 py-1 m-1 rounded-2xl'>hello</button>
            </div>
            <Footer />
            {/* </Auth> */}
        </ProtectedComponent>
    )
}

function Auth({ children }) {
    const { status } = useSession({ required: true })
    if (status === "loading") {
        return <div className='min-h-screen text-black flex flex-1 flex-col items-center justify-center px-20 text-center bg-gray-300'>Loading...</div>
    }

    return children
}
