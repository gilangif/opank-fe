import { create } from "zustand"
import { useUserStore } from "./user.store.js"
import { api_2 } from "../api.js"

export const useGroupStore = create((set) => ({
  lists: [],
  listData: {},

  getLists: async () => {
    const { data } = await api_2.get("/telegram/detail")
    const { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page, rows } = data

    const lists = rows.map((row) => {
      const invites = row.invites[0].link
      
    })

    set({ lists: rows, listData: { page, limit, search, total_rows, total_data, total_pages, prev_page, next_page } })

    return data
  },

  getLive: async (link) => {
    console.log("📢[:19]: ", link)
    const { data } = await api_2.post("/telegram/live_detail", { link })

    return data
  },
}))
