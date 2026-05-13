import { create } from "zustand"

export const usePopupStore = create((set) => ({
  open: false,
  title: "",
  detail: "",

  showPopup: (title, detail) => {
    set({ open: true, title, detail })
  },

  closePopup: () => {
    set({ open: false })
  },
}))
