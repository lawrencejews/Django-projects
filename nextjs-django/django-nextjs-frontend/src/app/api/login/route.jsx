"use server"

import { NextResponse } from "next/server"
import { setRefreshToken, setToken } from "@/lib/auth"
import { DJANGO_BASE_ENDPOINT } from "@/config/defaults";

const DJANGO_API_LOGIN_URL = `${DJANGO_BASE_ENDPOINT}/token/pair`

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