import axios from "axios"

import { API_1 } from "./config.js"
import { useUserStore } from "./store/user.store.js"

const api = axios.create({ baseURL: API_1 })

api.interceptors.request.use((config) => {
  const { accessToken } = useUserStore.getState()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) useUserStore.getState().logout()

    return Promise.reject(error)
  },
)

export default api
