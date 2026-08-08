import { create } from "zustand"
import { api_1 } from "../api.js"

export const useUserStore = create((set) => ({
  id: localStorage.getItem("id") || null,
  name: localStorage.getItem("name") || null,
  alias: localStorage.getItem("alias") || null,
  username: localStorage.getItem("username") || null,
  role: localStorage.getItem("role") || null,
  room: localStorage.getItem("room") || null,
  avatar: localStorage.getItem("avatar") || null,
  accessToken: localStorage.getItem("accessToken") || null,

  login: async (username, password) => {
    const { data } = await api_1.post("/auth/users", { username, password })
    const { id, name, alias, role, room, avatar, accessToken } = data

    localStorage.setItem("id", id)
    localStorage.setItem("name", name)
    localStorage.setItem("alias", alias)
    localStorage.setItem("username", username)
    localStorage.setItem("role", role)
    localStorage.setItem("room", room)
    localStorage.setItem("avatar", avatar)
    localStorage.setItem("accessToken", accessToken)

    set({ id, name, alias, username, role, room, avatar, accessToken })
  },

  logout: () => {
    localStorage.removeItem("id")
    localStorage.removeItem("name")
    localStorage.removeItem("alias")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    localStorage.removeItem("room")
    localStorage.removeItem("avatar")
    localStorage.removeItem("accessToken")

    set({ id: null, name: null, alias: null, username: null, role: null, room: null, avatar: null, accessToken: null })
  },
}))
