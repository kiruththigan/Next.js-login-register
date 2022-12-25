import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import withAuth from '../HOC/withAuth'
function Dashboard() {

    return (
        <div>
            <NavBar />
            <div className='min-h-screen bg-gray-300 text-center p-3'>
                dashboard<br />
            </div>
            <Footer />
        </div>
    )
}

export default  withAuth(Dashboard)