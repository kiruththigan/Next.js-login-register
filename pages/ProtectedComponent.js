import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function ProtectedComponent({ children }) {
  const router = useRouter()
  const [isAuthenticated,setIsAuthenticated]=useState(false)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsAuthenticated(true)
    }else{
      router.push('/')
    }
  },[])

  if (isAuthenticated) {
    return (
      <div>
        {children}
      </div>
    )
  } else {
    return (
      <h1 className='min-h-screen text-black flex flex-1 flex-col items-center justify-center px-20 text-center bg-gray-300'>
        Loading ....
      </h1>
    )
  }
}
