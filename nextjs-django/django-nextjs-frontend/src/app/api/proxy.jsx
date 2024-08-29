import { getToken } from "@/lib/auth"

// NextJS API Proxy HTTP Class
export default class ApiProxy {

  // HEADERS
  static async getHeaders(requireAuth) {
    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }

    const authToken = getToken()
    if (authToken && requireAuth) {
      headers["Authorization"] = `Bearer ${authToken}`
    }
    return headers
  }

  static async handleFetch(endpoint, requestOptions) {

    let data = {}
    let status = 500

    try {
      const response = await fetch(endpoint, requestOptions)
      data = await response.json()
      status = await response.status
    } catch (error) {
      data = { message: " Cannot reach API server", error: error }
      status = 500
    }
    return { data, status }
  }

  // POST
  static async post(endpoint, object, requireAuth) {
    const jsonDatas = JSON.stringify(object)
    const headers = await ApiProxy.getHeaders(requireAuth)
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: jsonDatas
    }
    return await ApiProxy.handleFetch(endpoint, requestOptions)
  }

  // GET
  static async get(endpoint, requireAuth) {
    const headers = await ApiProxy.getHeaders(requireAuth)
    const requestOptions = {
      method: "GET",
      headers: headers,
    }
    return await ApiProxy.handleFetch(endpoint, requestOptions)
  }
}