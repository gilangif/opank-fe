import { create } from "zustand"

export const useUserStore = create((set) => ({
  id: localStorage.getItem("id") || null,
  name: localStorage.getItem("name") || null,
  alias: localStorage.getItem("alias") || null,
  username: localStorage.getItem("username") || null,
  role: localStorage.getItem("role") || null,
  room: localStorage.getItem("room") || null,
  avatar: localStorage.getItem("avatar") || null,
  accessToken: localStorage.getItem("accessToken") || null,

  login: (id, name, alias, username, role, room, avatar, accessToken) => {
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
    localStorage.removeItem("id", id)
    localStorage.removeItem("name", name)
    localStorage.removeItem("alias", alias)
    localStorage.removeItem("username", username)
    localStorage.removeItem("role", role)
    localStorage.removeItem("room", room)
    localStorage.removeItem("avatar", avatar)
    localStorage.removeItem("accessToken", accessToken)

    set({ id: null, name: null, alias: null, username: null, role: null, room: null, avatar: null, accessToken: null })
  },
}))
