import { NextResponse } from "next/server";

import { getToken } from "@/lib/auth"

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/"

export async function GET(request) {
  
  const authToken = getToken()
  if (!authToken) {
    return NextResponse.json({}, {status: 401})
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  }

  const response  = await fetch(DJANGO_API_WAITLISTS_URL,options)
  const result = await response.json()
  if (!response.ok) {
    return NextResponse.json({...result}, {status: 401})
  }
  return NextResponse.json({...result}, {status: 200})
}

export async function POST(request) {

  const requestData = await request.json()
  const jsonDatas = JSON.stringify(requestData)
  let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
  
  const authToken = getToken()
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`
  } 

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonDatas
  }

  const response = await fetch(DJANGO_API_WAITLISTS_URL, requestOptions)
  try {
    const responseData = await response.json()
  } catch (error) {
    NextResponse.json({message: "Invalid request"}, { status: 200 })
  }
  if (response.ok) { 
     return NextResponse.json({}, { status: 200 })
  }
  return NextResponse.json({}, { status: 400 })
}