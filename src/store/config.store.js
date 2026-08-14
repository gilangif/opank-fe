import { create } from "zustand"
import { api_1 } from "../api.js"

export const useConfigStore = create((set, get) => ({
  configs: [],
  claimDelay: 0,
  claimDetail: 0,
  claimSafeMode: 0,

  setConfig: async ({ delay, detail, safeMode }) => {
    await api_1.post("/settings/delay", { delay })
    await api_1.post("/settings/detail", { detail: detail === 1 ? true : false })
    await api_1.post("/settings/safemode", { safe_mode: safeMode === 1 ? true : false })
  },

  getConfig: async () => {
    const { data } = await api_1.get("/settings")

    const find_delay = data.find((config) => config.key === "claim_delay")
    const find_detail = data.find((config) => config.key === "claim_detail")
    const find_safe_mode = data.find((config) => config.key === "claim_safe_mode")

    set({
      configs: data,
      claimDelay: find_delay ? find_delay.value : 0,
      claimDetail: find_detail ? (find_detail.value ? 1 : 0) : 0,
      claimSafeMode: find_safe_mode ? (find_safe_mode.value ? 1 : 0) : 0,
    })

    return data
  },
}))
