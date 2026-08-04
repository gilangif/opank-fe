import { Fragment, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useClaimStore } from "../store/claim.store.js"
import { useUserStore } from "../store/user.store.js"

function formatDate(date = new Date()) {
  const d = new Date(date)

  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()

  let hours = d.getHours()

  const minutes = String(d.getMinutes()).padStart(2, "0")
  const seconds = String(d.getSeconds()).padStart(2, "0")

  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12

  return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`
}

export default function Claims() {
  const { logs, getLogs } = useClaimStore((state) => state)
  const { alias, name, room, role } = useUserStore((state) => state)

  const [openRow, setOpenRow] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [limit, setLimit] = useState(() => searchParams.get("limit") || "")
  const [search, setSearch] = useState(() => searchParams.get("search") || "")

  const handleSearch = (e) => {
    e.preventDefault()

    const params = Object.fromEntries(searchParams)

    setSearchParams({ ...params, search })
    getLogs(params)
  }

  useEffect(() => {
    const params = {}

    const limit = parseInt(searchParams.get("limit") || "5")
    const search = searchParams.get("search") || ""

    if (limit) params.limit = limit
    if (search) params.search = search

    getLogs(params)
  }, [])

  return (
    <>
      <div className="m-2">
        <div className="py-3 mb-3">
          <form className="flex items-center max-w-md mx-auto space-x-2" onSubmit={(e) => handleSearch(e)}>
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base ps-9 text-black text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
                placeholder="Search claims logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center shrink-0 text-white bg-yellow-900 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </form>
        </div>

        <div className="relative overflow-x-auto shadow-xs rounded ">
          <table className="w-full text-sm text-left text-xs">
            <thead class="bg-yellow-900/50 text-white text-xs">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">BATCH</th>
                <th className="p-2">CODE</th>
                <th className="p-2">STATUS</th>
                <th className="p-2">SENDER</th>
                <th className="p-2">GROUP</th>
                <th className="p-2">CLAIMS</th>
                <th className="p-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const { claims } = log

                return (
                  <Fragment>
                    <tr className="even:bg-gray-500/20" key={i} onClick={() => setOpenRow(openRow === log.id ? null : log.id)}>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.id}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.order_id}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">
                        {log.link !== "???" ? (
                          <a className="font-bold text-yellow-500" href={log.link}>
                            {log.code.toUpperCase()}
                          </a>
                        ) : (
                          log.code.toUpperCase()
                        )}
                      </td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.status}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.sender}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.group_title}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.claims.length} USERS</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{formatDate(log.created_at * 1000)}</td>
                    </tr>

                    {log.id === openRow && (
                      <tr className="w-100">
                        <td />
                        <td colSpan="8" className="p-2">
                          <table className="w-full text-sm text-left text-body text-xs">
                            <tbody>
                              {claims.map((claim) => {
                                const { user, order } = claim

                                return (
                                  <tr className="odd:bg-gray-400/10" key={order.id}>
                                    <td className={`py-1 px-2 text-white whitespace-nowrap ${user.room === room ? "font-bold text-yellow-500" : ""}`}>{order.claim_name}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">RP {order.claim_amount}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">{order.claim_status}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">{user.alias}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">{user.room}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">{user.role}</td>
                                    <td className="py-1 px-2 text-white whitespace-nowrap">{formatDate(order.created_at * 1000)}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
