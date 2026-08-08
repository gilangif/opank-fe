import { create } from "zustand"
import { useUserStore } from "./user.store.js"
import { api_1 } from "../api.js"

export const useDeviceStore = create((set) => ({
  onlines: [],
  oflines: [],

  disconnectSocket: async (username) => {
    const { data } = await api_1.post("/socket/disconnect/username", { username })
    return data
  },

  getDevices: async () => {
    const { room, accessToken } = useUserStore.getState()
    const { data } = await api_1.get("/socket/lists")
    const { message, online, offline } = data

    const on = online.sort((a, b) => {
      if (a.room === room && b.room !== room) return -1
      if (a.room !== room && b.room === room) return 1

      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    const off = offline.sort((a, b) => {
      if (a.room === room && b.room !== room) return -1
      if (a.room !== room && b.room === room) return 1

      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    set({ onlines: on, offlines: off })

    return data
  },
}))
