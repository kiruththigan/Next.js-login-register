import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { authentication } from '../store/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [errors, setErrors] = useState('')

  const [authState, setAuthState] = useState({
    email: '',
    password: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const fieldOnchangeHandler = (e) => {
    setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    // dispatch(authentication(authState))
    signIn('credentials', {
      ...authState,
      redirect: false
    }).then(response => {
      // console.log(response)
      if (!response.error) {
        router.push("/dashboard")
      } else {
        if (response.error == "CredentialsSignin") {
          setErrors("username or password wrong!")
        } else {
          setErrors(response.error)
        }
        setTimeout(() => {
          setErrors('')
        }, 5000);
      }
    }).catch(error => {
      console.log(error)
      setErrors(error)
      setTimeout(() => {
        setErrors('')
      }, 5000);
    })
  }

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
            {/* <button className="primary-button rounded-2xl bg-blue-500 text-white px-5 py-1" disabled={auth.loading}>{auth.loading?'Loading':'Login'}</button> */}
            <button className="primary-button rounded-2xl bg-blue-500 text-white px-5 py-1" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
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
