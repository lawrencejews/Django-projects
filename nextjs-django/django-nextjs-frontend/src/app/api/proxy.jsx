

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

  // POST
  static async post(endpoint, object, requireAuth) {
    const jsonDatas = JSON.stringify(object)
    const headers = await ApiProxy.getHeaders(requireAuth)
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: jsonDatas
    }
    return await fetch(endpoint, requestOptions)
  }

  // GET
  static async get(endpoint, requireAuth) {
    const headers = await ApiProxy.getHeaders(requireAuth)
    const requestOptions = {
      method: "GET",
      headers: headers,
    }
    return await fetch(endpoint, requestOptions)
  }
}