import { create } from "zustand"
import { useUserStore } from "./user.store.js"
import { api_1, api_2 } from "../api.js"

export const useGroupStore = create((set, get) => ({
  accounts: [],
  details: [],
  lists: [],
  listData: {},

  getAccounts: async () => {
    const { data } = await api_1.get("/telegram/accounts")
    const accounts = data.filter((account) => account.method === 1).sort((a, b) => a.key - b.key)

    set({ accounts })
  },

  getInviteDetail: async (link) => {
    set({ details: [] })

    await get().getAccounts()

    const accounts = get().accounts

    const promise = accounts.map(async (account) => {
      try {
        const { data } = await api_1.post("/telegram/invite/detail", { account: account.key, link })
        const { type, banned, joined } = data

        const status = type === "User" ? "USER" : banned ? "BANNED" : joined ? "JOINED" : "LEFT"
        const action = type === "User" ? null : banned ? null : joined ? "leave" : "join"

        return { ...data, status, action }
      } catch (error) {
        return { account, status: "ERROR", action: null }
      }
    })

    const details = await Promise.all(promise)

    set({ details })
  },

  inviteAction: async (account, link, action) => {
    const details = get().details

    const { data } = await api_1.post("/telegram/invite/action", { account, link, action })
    const { message, detail } = data
    const { type, banned, joined } = detail

    const status_detail = type === "User" ? "USER" : banned ? "BANNED" : joined ? "JOINED" : "LEFT"
    const action_detail = type === "User" ? null : banned ? null : joined ? "leave" : "join"

    const lists = details.map((list) => {
      const { type, banned, joined } = list

      const status = type === "User" ? "USER" : banned ? "BANNED" : joined ? "JOINED" : "LEFT"
      const action = type === "User" ? null : banned ? null : joined ? "leave" : "join"

      if (list.account.key === detail.account.key) return { ...detail, status: status_detail, action: action_detail }

      return { ...list, status, action }
    })

    set({ details: lists })

    const { username } = useUserStore.getState()

    const caption = `${username} : success ${action} group ${detail.title} (${detail.code})`
    await api_1.post("/bot/send", { caption })

    return details
  },

  getLists: async (params) => {
    set({ lists: [] })

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
