import { create } from "zustand"

import { API_1 } from "../config.js"
import { useUserStore } from "./user.store.js"

import axios from "axios"

export const useClaimStore = create((set) => ({
  logs: [],

  getLogs: async (params) => {
    try {
      const { room, accessToken } = useUserStore.getState()
      const { data } = await axios.get(API_1 + "/claims/orders", { headers: { Authorization: `Bearer ${accessToken}` }, params })

      set({ logs: data.rows })
    } catch (error) {
      console.log("📢[:24]: ", error)
    }
  },
}))
