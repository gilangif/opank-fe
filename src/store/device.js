import { create } from "zustand"

import { API_1 } from "../config.js"
import { useUserStore } from "./user.js"

import axios from "axios"

export const useDeviceStore = create((set) => ({
  onlines: [],
  oflines: [],

  disconnectSocket: async (username) => {
    const { accessToken } = useUserStore.getState()
    const { data } = await axios.post(API_1 + "/socket/disconnect/username", { headers: { Authorization: `Bearer ${accessToken}` } }, { username })

    return data
  },

  getDevices: async () => {
    const { room, accessToken } = useUserStore.getState()
    const { data } = await axios.get(API_1 + "/socket/lists", { headers: { Authorization: `Bearer ${accessToken}` } })
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
