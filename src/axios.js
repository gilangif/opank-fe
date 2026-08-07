import axios from "axios"

import { API_1 } from "./config.js"
import { useUserStore } from "./store/user.store.js"
import { usePopupStore } from "./store/popup.store.js"

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
    const status = error?.response?.status || 500
    const message = error?.response?.data?.message || "UNKNOWN ERROR"

    usePopupStore.getState().showPopup("ERROR", message)

    if (status === 401 && message !== "ALIPAYJSESSIONID Unauthorized") useUserStore.getState().logout()

    return Promise.reject(error)
  },
)

export default api
