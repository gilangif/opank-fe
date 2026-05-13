import { create } from "zustand"

import { API_1 } from "../config.js"
import { useUserStore } from "./user.js"

import axios from "axios"

export const useSessionStore = create((set) => ({
  sessions: [],

  removeSession: async (id) => {
    const { accessToken } = useUserStore.getState()
    const { data } = await axios.post(API_1 + "/sessions/remove", { id }, { headers: { Authorization: `Bearer ${accessToken}` } })

    return data
  },

  checkSession: async (id) => {
    const { accessToken } = useUserStore.getState()
    const { data } = await axios.post(API_1 + "/sessions/update", { id }, { headers: { Authorization: `Bearer ${accessToken}` } })

    return data
  },

  addSession: async (ALIPAYJSESSIONID) => {
    const { accessToken } = useUserStore.getState()
    const { data } = await axios.post(API_1 + "/sessions/add", { ALIPAYJSESSIONID }, { headers: { Authorization: `Bearer ${accessToken}` } })

    return data
  },

  getSessions: async () => {
    try {
      const { room, accessToken } = useUserStore.getState()
      const { data } = await axios.get(API_1 + "/sessions/lists", { headers: { Authorization: `Bearer ${accessToken}` } })

      const sessions = data.sort((a, b) => {
        if (a.data.balanceDisplay.statusText === "Unauthorized" && b.data.balanceDisplay.statusText !== "Unauthorized") return -1
        if (a.data.balanceDisplay.statusText !== "Unauthorized" && b.data.balanceDisplay.statusText === "Unauthorized") return 1

        if (a.user_data.room === room && b.user_data.room !== room) return -1
        if (a.user_data.room !== room && b.user_data.room === room) return 1

        return new Date(b.updated_at) - new Date(a.updated_at)
      })

      set({ sessions })
    } catch (error) {
      console.log("📢[:24]: ", error)
    }
  },
}))
