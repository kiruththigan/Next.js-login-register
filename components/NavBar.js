import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function NavBar() {
    const router = useRouter()
    const handlerSignout = (e) => {
        e.preventDefault()
        signOut()
    }
    return (
        <header className="p-2">
            <nav>
                <ul className="flex p-1 w-full">
                    <li>
                        <button onClick={handlerSignout} className="border-solid border-2 border-sky-300 rounded-2xl px-2 py-1 bg-white mx-1">Sign Out</button >
                    </li>
                    {/* <li>
                        <Link className="border-solid border-2 border-sky-300 rounded-2xl px-2 py-1 bg-white mx-1" href="/">SignIn</Link>
                    </li>
                    <li>
                        <Link className="border-solid border-2 border-sky-300 rounded-2xl px-2 py-1 bg-white mx-1" href="/register">SignUp</Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    )
}
