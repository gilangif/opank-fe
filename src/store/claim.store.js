import { create } from "zustand"

import api from "../axios.js"

export const useClaimStore = create((set) => ({
  logs: [],
  logsData: {},

  getLogs: async (params) => {
    const { data } = await api.get("/claims/orders", { params })
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    set({ logs: rows, logsData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },
}))
