import { create } from "zustand"
import { api_1 } from "../api.js"

export const useClaimStore = create((set) => ({
  logs: [],
  orders: [],
  logData: {},
  orderData: {},

  statement: {},

  getClaimLogs: async (params) => {
    const { data } = await api_1.get("/claims/logs", { params })
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    set({ logs: rows, logData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },

  getClaimOrders: async (params) => {
    const { data } = await api_1.get("/claims/orders", { params })
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    set({ orders: rows, orderData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },

  getStatement: async (start, end) => {
    const { data } = await api_1.get("/claims/statement", { params: { start, end } })
    const { rooms, users } = data

    set({
      statement: {
        rooms: { ...rooms, data: rooms.data.sort((a, b) => b.total_amount - a.total_amount) },
        users: { ...users, data: users.data.sort((a, b) => b.total_amount - a.total_amount) },
      },
    })

    return data
  },
}))
