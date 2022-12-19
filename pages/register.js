import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export default function register() {
    const router = useRouter()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [isLoading,setIsLoading]=useState(false)

    const fieldOnchangeHandler = (e) => {
        setUser(old => ({ ...old, [e.target.id]: e.target.value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        let res = await userRegister(user)
        setIsLoading(false)
        if (res) {
            router.push('/')
        } else {
            console.log('register error');
        }
    }

    const userRegister = async (data) => {

        try {
            const res = await fetch('https://ujkp2xeahs.us-east-1.awsapprunner.com/api/v1/authenticate/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })

            const user = await res.json()

            if (res.ok && user) {
                console.log("successfully register");
                return true
            } else {
                console.log("Already Exist");
                return false
            }
        } catch (error) {
            console.log(error + "register failed");
        }

    }

    return (
        <>
            <Head>
                <title>Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen text-black flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-gray-300">
                <form
                    className="mx-auto md:w-2/6 sm:w-5/6 rounded-2xl shadow-2xl bg-white p-5"
                    onSubmit={submitHandler}
                >
                    <h1 className="mb-4 text-xl">Signup</h1>
                    <div className="mb-4 text-left">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type="text"
                            className="w-full bg-gray-200 rounded-2xl py-1 px-2"
                            id="name"
                            placeholder='Name'
                            autoFocus
                            required
                            onChange={fieldOnchangeHandler}
                        />
                    </div>
                    <div className="mb-4 text-left">
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type="email"
                            className="w-full bg-gray-200 rounded-2xl py-1 px-2"
                            id="email"
                            placeholder='E-Mail'
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
                            placeholder='Password'
                            required
                            onChange={fieldOnchangeHandler}
                        />
                    </div>
                    <div className="mb-4">
                        <button className="primary-button rounded-2xl bg-blue-500 text-white px-5 py-1" disabled={isLoading}>{isLoading?"Loading...":"Signup"}</button>
                    </div>
                    <div className="mb-4">
                        Don&apos;t have an account? &nbsp;
                        <Link href={`/`} className=" text-blue-400">Signin</Link>
                    </div>
                </form>
            </main>
        </>
    )
}
