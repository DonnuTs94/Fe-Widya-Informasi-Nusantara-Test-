import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
})

axiosInstance.interceptors.request.use((req) => {
  const authToken = localStorage.getItem("auth_token")

  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`
  }
  return req
})

axiosInstance.interceptors.response.use(
  (resSuccess) => {
    return resSuccess
  },
  (resError) => {
    if (resError.response.status === 401) {
      localStorage.removeItem("auth_token")
    }
    return Promise.reject(resError)
  }
)

export default axiosInstance
