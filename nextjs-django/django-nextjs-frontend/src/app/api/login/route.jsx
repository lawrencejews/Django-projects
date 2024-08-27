"use server"

import { NextResponse } from "next/server"
import { setRefreshToken, setToken } from "@/lib/auth"

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"

export async function POST(request) {

  const requestData = await request.json()
  const jsonDatas = JSON.stringify(requestData)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonDatas
  }

  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
  const responseData = await response.json()
  if (response.ok) { 
    // console.log("logged in")
    const {username, access, refresh} = responseData
    setToken(access)
    setRefreshToken(refresh)
     return NextResponse.json({ "LoggedIn ": true, "username ": username }, { status: 200 })
  }
  return NextResponse.json({ "LoggedIn": false , ...requestData}, { status: 400 })
}