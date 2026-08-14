import { Fragment, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useClaimStore } from "../store/claim.store.js"
import { useUserStore } from "../store/user.store.js"

import getPagination from "../utils/getPagination.js"
import formatDate from "../utils/formatDate.js"


export default function Claims() {
  const { logs, logsData, getLogs } = useClaimStore((state) => state)
  const { alias, name, room, role } = useUserStore((state) => state)

  const [openRow, setOpenRow] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(() => searchParams.get("page") || "")
  const [limit, setLimit] = useState(() => searchParams.get("limit") || "")
  const [search, setSearch] = useState(() => searchParams.get("search") || "")

  const pages = getPagination(logsData.page, logsData.total_pages)

  const handleNavigation = (e, page) => {
    e.preventDefault()
    setSearchParams({ ...Object.fromEntries(searchParams), page })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ ...Object.fromEntries(searchParams), search })
  }

  useEffect(() => {
    const params = {}

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search") || ""

    if (page) params.page = page
    if (limit) params.limit = limit
    if (search) params.search = search

    getLogs(params)

    document.title = "OPANK CLAIMS LOGS"
  }, [searchParams])

  return (
    <>
      <div className="m-2">
        <div className="flex items-start sm:items-center p-4 mb-2 text-sm text-fg-warning rounded-base bg-warning-soft" role="alert">
          <svg className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <p>
            <span className="font-medium me-1">Information:</span> Showing page {logsData.page} with {logsData.search ? `search results "${logsData.search}" ` : ""} total {logsData?.total_data} of{" "}
            {logsData.total_rows} rows.
          </p>
        </div>
        <div className="py-3 mb-3">
          <form className="flex items-center max-w-md mx-auto space-x-2" onSubmit={(e) => handleSearch(e)}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center shrink-0 text-white bg-yellow-900 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </form>
        </div>

        <div className="relative overflow-x-auto shadow-xs rounded ">
          <table className="w-full text-sm text-left text-xs">
            <thead className="bg-yellow-900/50 text-white text-xs">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">BATCH</th>
                <th className="p-2">CODE</th>
                <th className="p-2">STATUS</th>
                <th className="p-2">CLAIMS</th>
                <th className="p-2">SENDER</th>
                <th className="p-2">GROUP</th>
                <th className="p-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const { claims } = log

                const claimed = claims.filter((claim) => claim.order.claim_status === "OK")

                const group = log.group_username ? `https://t.me/${log.group_username}/${log.message_id}` : `https://t.me/c/${String(log.group_id).slice(4)}/${log.message_id}`
                const total = claims.map(({ order }) => order.claim_amount).reduce((a, b) => a + b, 0)

                return (
                  <Fragment key={i}>
                    <tr className="even:bg-gray-500/20" onClick={() => setOpenRow(openRow === log.id ? null : log.id)}>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.id}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.order_id}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">
                        {log.code !== "???" ? (
                          <a className="font-bold text-yellow-500" href={`https://link.dana.id/kaget?c=${log.code}`}>
                            {log.code.toUpperCase()}
                          </a>
                        ) : (
                          log.code.toUpperCase()
                        )}
                      </td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.status}</td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">
                        {claimed.length} of {claims.length} USERS TOTAL RP {new Intl.NumberFormat("id-ID").format(total)}
                      </td>
                      <td className="px-2 py-3 text-white whitespace-nowrap">{log.sender}</td>
                      <td className={`px-2 py-3 ${log.group_username ? "text-yellow-500" : "text-white"} whitespace-nowrap`}>
                        <a href={group}>{log.group_title}</a>
                      </td>
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
                                    <td className={`py-2 px-2 text-white whitespace-nowrap ${user.room === room ? "font-bold text-yellow-500" : ""}`}>{order.claim_name}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">RP {order.claim_amount}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">{order.claim_status}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">{user.alias}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">{user.room}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">{user.role}</td>
                                    <td className="py-2 px-2 text-white whitespace-nowrap">{formatDate(order.created_at * 1000)}</td>
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

        <nav className="my-5 w-100vw flex justify-center">
          <ul className="flex -space-x-px text-sm">
            <li>
              <button
                className="flex items-center justify-center text-white bg-yellow-900/40 box-border hover:bg-yellow-900 font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-900/40"
                disabled={!logsData.prev_page}
                onClick={(e) => handleNavigation(e, logsData.prev_page)}
              >
                <span className="sr-only">Previous</span>
                <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                </svg>
              </button>
            </li>

            {pages.map((page, i) => {
              return (
                <li key={i}>
                  <button
                    onClick={(e) => handleNavigation(e, page)}
                    className={`flex items-center justify-center ${page === logsData.page ? "bg-white/90 text-yellow-900 font-bold" : "bg-yellow-900/40 text-white"}  box-border hover:bg-yellow-900 hover:text-white font-medium text-sm w-9 h-9 focus:outline-none`}
                  >
                    {page}
                  </button>
                </li>
              )
            })}

            <li>
              <button
                className="flex items-center justify-center text-white bg-yellow-900/40 box-border hover:bg-yellow-900 font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-900/40"
                disabled={!logsData.next_page}
                onClick={(e) => handleNavigation(e, logsData.next_page)}
              >
                <span className="sr-only">Next</span>
                <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
