"use client"
import React from 'react'

import { useAuth } from "@/components/authProvider"

const LOGIN_URL = "/api/login/"

const LoginPage = () => {

  const auth = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const objectFromForm = Object.fromEntries(formData)
    const jsonData = JSON.stringify(objectFromForm)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonData
    }

    const response = await fetch(LOGIN_URL, requestOptions)
    let data = {}
    try {
      data = await response.json()
    } catch (error) {
      console.log(error)
    }
    // const data = await response.json()
    if (response.ok) {
      console.log("logged in")
      auth.login(data?.username)
    } else {
      console.log(await response.json())
    }
  }

  return (
    <div className='h-[95vh]'>
      <div className='max-w-md mx-auto py-8'>
        <h1 className='py-3'>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' required name='username' placeholder='Your username' />
          <input type='password' required name='password' placeholder='Your password' />
          <button type='submit'>Login In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;