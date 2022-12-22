import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function ProtectedComponent({ children }) {
  const { data, status } = useSession()
  const route = useRouter()

  useEffect(() => {
    if (!data) {
      route.push('/')
    }
  },[],10000000)
  return (
    <div>
      {children}
    </div>
  )
}
