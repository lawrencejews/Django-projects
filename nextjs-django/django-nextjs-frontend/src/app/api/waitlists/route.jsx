import { NextResponse } from "next/server";

import { getToken } from "@/lib/auth"
import ApiProxy from "../proxy";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8001/api/waitlists/"

export async function GET(request) {
  
  const authToken = getToken()
  if (!authToken) {
    return NextResponse.json({}, {status: 401})
  }

  const response = await ApiProxy.post(DJANGO_API_WAITLISTS_URL, true)
  const result = await response.json()
  if (!response.ok) {
    return NextResponse.json({...result}, {status: 401})
  }
  return NextResponse.json({...result}, {status: 200})
}

export async function POST(request) {

  const requestData = await request.json()
  const response = await ApiProxy.post(DJANGO_API_WAITLISTS_URL, requestData, true)
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