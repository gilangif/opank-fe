import axios from "axios"

import { API_1, API_2 } from "./config.js"
import { useUserStore } from "./store/user.store.js"

export const api_1 = axios.create({ baseURL: API_1 })
export const api_2 = axios.create({ baseURL: API_2 })

api_1.interceptors.request.use((config) => {
  const { accessToken } = useUserStore.getState()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api_1.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) useUserStore.getState().logout()

    return Promise.reject(error)
  },
)

api_2.interceptors.request.use((config) => {
  const { accessToken } = useUserStore.getState()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api_2.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) useUserStore.getState().logout()

    return Promise.reject(error)
  },
)
