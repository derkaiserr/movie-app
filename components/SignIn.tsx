"use client"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import { auth} from "@/firebase"
// import {auth} from  '../../firebase'
const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // console.log(email)
    const register = async (e:any) => {
        e.preventDefault()
        // try{
        //     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        //     console.log(userCredential)
        //     const user = userCredential.user;
        //     localStorage.setItem('token', user.accessToken)
        //     localStorage.setItem('user', JSON.stringify(user))
        // }
        // catch(err){
        //     alert(err.message)
        // }
    }
    const router = useRouter();
    
    const signIn = (e:any) => {
        e.preventDefault()
        router.push('/dashboard');
    }
        // Implement sign-in logic here

    //     try{
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    //          console.log(userCredential)
    //          const user = userCredential.user;
    //          localStorage.setItem('token', user.accessToken)
    //          localStorage.setItem('user', JSON.stringify(user))
    //     }
    //     catch(error){
    //         alert(error.message)
    //     }
    // }

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value)
    // }

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value)

    return (
        <div className='signIn'>
             <form onSubmit={signIn}>
                <h1>Sign In</h1>
                <div>
                    <input
                        type="email"
                        placeholder='Email Address'
                        // value={email}
                        // onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='Password'
                        // value={password}
                        // onChange={handlePasswordChange}
                    />
                </div>
                {/* <Link href="/dashboard" */}
                <button
                    type='submit'
                    id='signIn_btn'
                    // onClick={signIn}
                    >
                    Sign In
                {/* </Link> */}
                </button>
                <h4 className='gid'>
                    <span className='grey'>New to Netflix?</span>
                    <span className='signIn_link' onClick={register}> Sign Up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignIn
