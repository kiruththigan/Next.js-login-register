import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../../store/auth/authSlice";

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}
// const dispatch = useDispatch()
// const auth = useSelector(state => state.auth)

export const authOptions = {
    pages: {
        signIn: "/"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {

                const res = await fetch('https://ujkp2xeahs.us-east-1.awsapprunner.com/api/v1/authenticate/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user
                }


                // if (credentials.email=='abc@gmail.com') {
                //     return credentials.email
                // }


                // dispatch(authentication(credentials))

                return null
            }
        })
    ],
}

export default NextAuth(authOptions)