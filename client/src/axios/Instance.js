import axios from "axios"
const baseUrl=process.env.REACT_APP_BASE_URL
const mechanicUrl=process.env.REACT_APP_MECHANIC_URL
const adminUrl=process.env.REACT_APP_ADMIN_URL


const createAxiosClient = (baseURL) => {

    const client = axios.create({
      baseURL,
      timeout: 4000,
      timeoutErrorMessage: "Request timeout... Please Try Again!!!"
    })
    return client
  }
  const attachToken = (req, tokenName = "token") => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
  }

  const mechanicAxiosInstance = createAxiosClient(mechanicUrl)
mechanicAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "mechanictoken")
  return modifiedReq
})

const userAxiosInstance = createAxiosClient(baseUrl)

userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "usertoken")
  return modifiedReq
})

const adminAxiosInstance = createAxiosClient(adminUrl)

adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "admintoken")
  return modifiedReq
})

  
export {mechanicAxiosInstance,userAxiosInstance,adminAxiosInstance}
