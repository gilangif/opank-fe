import { create } from "zustand"
import { useUserStore } from "./user.store.js"

import api from "../axios.js"

export const useSessionStore = create((set) => ({
  sessions: [],

  removeSession: async (id) => {
    const { data } = await axios.post(API_1 + "/sessions/remove", { id })
    return data
  },

  checkSession: async (id) => {
    const { data } = await api.post(API_1 + "/sessions/update", { id })
    return data
  },

  addSession: async (ALIPAYJSESSIONID) => {
    const { data } = await api.post(API_1 + "/sessions/add", { ALIPAYJSESSIONID })
    return data
  },

  getSessions: async () => {
    const { room, accessToken } = useUserStore.getState()
    const { data } = await api.get("/sessions/lists")

    const sessions = data.sort((a, b) => {
      if (a.data.balanceDisplay.statusText === "Unauthorized" && b.data.balanceDisplay.statusText !== "Unauthorized") return -1
      if (a.data.balanceDisplay.statusText !== "Unauthorized" && b.data.balanceDisplay.statusText === "Unauthorized") return 1

      if (a.user_data.room === room && b.user_data.room !== room) return -1
      if (a.user_data.room !== room && b.user_data.room === room) return 1

      return new Date(b.updated_at) - new Date(a.updated_at)
    })

    set({ sessions })

    return sessions
  },
}))
