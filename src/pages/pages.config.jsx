import { useEffect, useState } from "react"
import { useConfigStore } from "../store/config.store.js"
import formatDate from "../utils/formatDate.js"
import { useUserStore } from "../store/user.store.js"

export default function Config() {
  const { configs, getConfig, setConfig, claimDelay, claimDetail, claimSafeMode } = useConfigStore((state) => state)
  const { role } = useUserStore((state) => state)

  const [delay, setDelay] = useState(() => claimDelay)
  const [detail, setDetail] = useState(() => claimDetail)
  const [safeMode, setSafeMode] = useState(() => claimSafeMode)

  const [loading, setLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await setConfig({ delay, detail, safeMode })
    await handleGetConfig()
  }

  const handleGetConfig = async () => {
    try {
      setLoading(true)
      await getConfig()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetConfig()
  }, [])

  useEffect(() => {
    setDelay(claimDelay)
    setDetail(claimDetail)
    setSafeMode(claimSafeMode)
  }, [configs])

  if (role !== "admin") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-4 gap-3">
        <h6 className="text-2xl">YOU HAVE NO POWER HERE</h6>
        <p className="text-sm">this page for admin only</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col sm:flex-row justify-center px-4 gap-3">
      <div className={`flex flex-1 items-center w-full justify-center h-56 w-56 text-fg-brand-strong text-xs font-medium rounded-base ${loading ? "" : "hidden"}`}>
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-neutral-quaternary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>

      <div className={`relative overflow-x-auto shadow-xs rounded-base border border-default flex-2 ${loading ? "hidden" : ""}`}>
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">
                KEY
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                TYPE
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                VALUE
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                UPDATED
              </th>
            </tr>
          </thead>
          <tbody>
            {configs.map((config, i) => {
              return (
                <tr className="border-b border-default text-white" key={config.key}>
                  <th scope="row" className="px-3 py-3">
                    {config.key}
                  </th>
                  <td className="px-3 py-3">{config.type}</td>
                  <td className="px-3 py-3">{String(config.value)}</td>
                  <td className="px-3 py-3">{formatDate(config.update_at)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex-1">
        <form
          class="w-full px-2 mt-6 sm:mt-0"
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <div class="mb-5">
            <label for="email" class="block mb-2.5 text-sm font-medium text-white">
              CLAIM DELAY
            </label>
            <input
              type="number"
              id="email"
              class="bg-neutral-secondary-medium border border-default-medium text-black text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="CLAIM DELAY"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
            />
          </div>
          <div class="mb-5 flex gap-3">
            <div class="w-full">
              <label for="email" class="block mb-2.5 text-sm font-medium text-white">
                CLAIM DETAIL
              </label>
              <select
                id="countries_disabled"
                class="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs text-fg-disabled"
                value={detail}
                onChange={(e) => setDetail(parseInt(e.target.value))}
              >
                <option value="1">ENABLE</option>
                <option value="0">DISABLE</option>
              </select>
            </div>
            <div class="w-full">
              <label for="email" class="block mb-2.5 text-sm font-medium text-white">
                SAFE MODE
              </label>
              <select
                id="countries_disabled"
                class="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs text-fg-disabled"
                value={safeMode}
                onChange={(e) => setSafeMode(parseInt(e.target.value))}
              >
                <option value="1">ENABLE</option>
                <option value="0">DISABLE</option>
              </select>
            </div>
          </div>

          <div class="flex items-start sm:items-center p-4 mb-4 text-sm text-fg-warning rounded-base bg-warning-soft border border-warning-subtle" role="alert">
            <p>
              <span class="font-medium me-1">Warning alert!</span>
              <div className="px-3">
                <li class="mt-2">Enable claim details if you want to get the link details before claiming; this configuration will add extra delay.</li>
                <li class="mt-3">Enable "Claim Safe Mode" to avoid senders whose names contain "DANA INDONESIA"; this feature must be activated in conjunction with the "Claim Detail" feature.</li>
              </div>
            </p>
          </div>
          <button
            type="submit"
            class="text-white w-full bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
