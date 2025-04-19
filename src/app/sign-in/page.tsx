'use client'

import React from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // ✅ Correct


function page() {

    const router = useRouter()

    let result

   const loginHandler = async() => {
        result = await signIn('credentials', {
        redirect: false,
        identifier: "123",
        password: "fun",
      });

      console.log("success : " , result)
   }

   const routeHandler = () => {
    console.log("change route clicked")
        router.push('/verify/dashboard');
   }
    
  return (
    <div>
        <button onClick={loginHandler} >Login</button>
        <button onClick={routeHandler} >Change</button>
    </div>
  )
}

export default page