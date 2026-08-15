import { create } from "zustand"
import { api_1 } from "../api.js"

export const useMonitorStore = create((set) => ({
  lists: [],
  systems: [],

  getSystems: async () => {
    const { data } = await api_1.get("/api/system")

    set({ systems: data })

    return data
  },

  getPM2: async () => {
    const { data } = await api_1.get("/api/pm2")

    set({ lists: data })

    return data
  },
}))
