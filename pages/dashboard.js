import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import withAuth from '../HOC/withAuth'
import ProtectedComponent from './ProtectedComponent'
function Dashboard() {

    return (
        <ProtectedComponent>
             <NavBar />
            <div className='min-h-screen bg-gray-300 text-center p-3'>
                dashboard
            </div>
             <Footer />
        </ProtectedComponent>
    )
}

export default  Dashboard