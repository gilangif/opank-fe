import { create } from "zustand"

export const useStore = create((set) => ({
  count: 0,
  user: null,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}))
