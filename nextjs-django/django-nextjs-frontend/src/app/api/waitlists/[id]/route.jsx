import { DJANGO_BASE_ENDPOINT } from "@/config/defaults";
import { NextResponse } from "next/server";
import ApiProxy from "../../proxy";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_BASE_ENDPOINT}/waitlists/`

export async function GET(request){
    const {data, status} = await ApiProxy.get(DJANGO_API_WAITLISTS_URL, true)
    return NextResponse.json(data, {status: status})
}

export async function POST(request) {
    const requestData = await request.json()
    const {data, status} = await ApiProxy.post(DJANGO_API_WAITLISTS_URL, requestData, true )
    return NextResponse.json(data, {status: status})
} 

export async function PUT(request, {params}) {
    const endpoint = params?.id ? `${DJANGO_API_WAITLISTS_URL}${params.id}/` : null
    const requestData = await request.json()
    const {data, status} = await ApiProxy.put(endpoint, requestData, true )
    return NextResponse.json(data, {status: status})
}   

export async function DELETE(request, {params}) {
    const endpoint = params?.id ? `${DJANGO_API_WAITLISTS_URL}${params.id}/delete/` : null
    const {data, status} = await ApiProxy.delete(endpoint, true )
    return NextResponse.json(data, {status: status})
} 