import { create } from "zustand"
import { api_1 } from "../api.js"

export const useClaimStore = create((set) => ({
  logs: [],
  logsData: {},
  statement: {},

  getClaimLogs: async (params) => {
    const { data } = await api_1.get("/claims/orders", { params })
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    set({ logs: rows, logsData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },

  getStatement: async (start, end) => {
    const { data } = await api_1.get("/claims/statement", { params: { start, end } })

    set({ statement: data })

    return data
  },
}))
