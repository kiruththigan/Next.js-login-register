import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { authentication } from '../store/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [errors, setErrors] = useState()

  const [authState, setAuthState] = useState({
    email: '',
    password: ''
  })

  const fieldOnchangeHandler = (e) => {
    setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(authentication(authState))
  }
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      router.push('/dashboard')
    }
    // if (auth.isSuccess) {
    //   console.log("test")
    //   router.push('/dashboard')
    // }

    if (auth.isFailed) {
      setErrors(auth.message)
    }

  }, [auth.payload,auth.isFailed])


  return (
    <>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-300 text-black flex w-full flex-1 flex-col items-center justify-center px-20 text-center min-h-screen">
        <form
          className="mx-auto md:w-2/6 sm:w-5/6 rounded-2xl shadow-2xl bg-white p-5 justify-center items-center"
          onSubmit={submitHandler}
        >
          <h1 className="mb-4 text-xl">Signin</h1>
          <div className="mb-4 text-left">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              className="w-full bg-gray-200 rounded-2xl py-1 px-2"
              id="email"
              value={authState.username}
              placeholder='E-Mail'
              autoFocus
              required
              onChange={fieldOnchangeHandler}
            />
          </div>
          <div className="mb-4 text-left">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              className="w-full bg-gray-200 rounded-2xl py-1 px-2"
              id="password"
              value={authState.password}
              placeholder='Password'
              required
              onChange={fieldOnchangeHandler}
            />
          </div>
          <div className="mb-4 ">
            <button className="primary-button rounded-2xl bg-blue-500 text-white px-5 py-1" disabled={auth.loading}>{auth.loading ? 'Loading' : 'Login'}</button>
            {/* <button className="primary-button rounded-2xl bg-blue-500 text-white px-5 py-1" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button> */}
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <Link href={`/register`} className="text-blue-400">Signup</Link>
          </div>
          <div className='p-2 text-red-500'>
            <span>{errors}</span>
          </div>
        </form>
      </main>
    </>
  )
}
