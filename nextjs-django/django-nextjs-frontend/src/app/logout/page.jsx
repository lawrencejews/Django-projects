"use client"
import React from 'react'

import { useAuth } from "@/components/authProvider"

import {useRouter} from "next/navigation"

const LOGOUT_URL = "/api/logout/"

const LoginPage = () => {

  const auth = useAuth()
  const  router = useRouter()

  async function handleClick(e) {
    e.preventDefault()

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: ""
    }

    const response = await fetch(LOGOUT_URL, requestOptions)
    if (response.ok) {
      console.log("logged Out")
      auth.logout()
      router.replace("/login")
      
    } else {
      console.log(await response.json())
    }
  }

  return (
    <div className='h-[95vh]'>
      <div className='max-w-md mx-auto py-8'>
        <h1 className='py-3'>Are You sure you want to logout? </h1>
          <button className='bg-red-500 px-3 py-2 text-white hover:bg-red-300' onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

export default LoginPage;