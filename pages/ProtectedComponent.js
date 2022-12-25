import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function ProtectedComponent({ children }) {
  // const route = useRouter()

  // useEffect(() => {
  //   if (!data) {
  //     route.push('/')
  //   }
  // },[])
  return (
    <div>
      {children}
    </div>
  )
}
