import { create } from "zustand"

import { API_1 } from "../config.js"
import { useUserStore } from "./user.store.js"

import axios from "axios"

export const useClaimStore = create((set) => ({
  logs: [],
  logsData: {},

  getLogs: async (params) => {
    try {
      const { room, accessToken } = useUserStore.getState()
      const { data } = await axios.get(API_1 + "/claims/orders", { headers: { Authorization: `Bearer ${accessToken}` }, params })
      const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

      set({ logs: rows, logsData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })
    } catch (error) {
      console.log("📢[:24]: ", error)
    }
  },
}))
