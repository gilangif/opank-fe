import { create } from "zustand"
import { useUserStore } from "./user.store.js"
import { api_2 } from "../api.js"

export const useGroupStore = create((set) => ({
  lists: [],
  listData: {},

  getLists: async (params) => {
    const { data } = await api_2.get("/telegram/detail", { params })
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    const live = rows.map(async (row) => {
      const output = { ...row, data: null }

      for (const invite of row.invites) {
        try {
          const { link, code } = invite
          const { data } = await api_2.post("/telegram/live_detail", { link })

          output.data = data
        } catch (error) {
          continue
        }
      }

      return output
    })

    const lists = await Promise.all(live)

    set({ lists, listData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },

  setMark: async (id, mark) => {
    const { data } = await api_2.post("/telegram/mark", { id, mark })
    return data
  },
}))
