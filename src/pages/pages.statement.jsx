import { Fragment, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useClaimStore } from "../store/claim.store.js"
import { useUserStore } from "../store/user.store.js"

import { BarChart } from "@mui/x-charts/BarChart"

import getDateRange from "../utils/formatDateRange.js"

export default function Statement() {
  const { logs, logData, getClaimLogs, getStatement, statement } = useClaimStore((state) => state)
  const { alias, name, room, role } = useUserStore((state) => state)

  const [openRow, setOpenRow] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const [range, setRange] = useState(() => getDateRange(new Date()))

  useEffect(() => {
    getStatement(range.start, range.end)

    document.title = "OPANK CLAIMS STATEMENT"
  }, [])

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 m-2">
        <div className="flex-1">
          <div className="relative overflow-x-auto shadow-xs rounded mb-3">
            <table className="w-full text-sm text-left text-xs">
              <thead className="bg-cyan-900/50 text-white text-xs">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">ROOM</th>
                  <th className="p-2">TOTAL AMOUNT</th>
                  <th className="p-2">TOTAL CLAIM</th>
                </tr>
              </thead>
              <tbody>
                {statement?.rooms?.data?.map((r, i) => {
                  return (
                    <Fragment key={i}>
                      <tr className="even:bg-gray-500/20" onClick={() => setOpenRow(openRow === r.room ? null : r.room)}>
                        <td className="px-2 py-3 text-white whitespace-nowrap">{i}</td>
                        <td className={`px-2 py-3 whitespace-nowrap ${r.room === room ? "text-cyan-400 font-bold" : "text-white"}`}>{r.room}</td>
                        <td className={`px-2 py-3 whitespace-nowrap ${r.room === room ? "text-cyan-400 font-bold" : "text-white"}`}>
                          RP {typeof r.total_amount === "string" ? r.total_amount : new Intl.NumberFormat("id-ID").format(r.total_amount)}
                        </td>
                        <td className={`px-2 py-3 whitespace-nowrap ${r.room === room ? "text-cyan-400 font-bold" : "text-white"}`}>{r.total_claim}</td>
                      </tr>

                      {r.room === openRow && (
                        <tr className="w-100">
                          <td />
                          <td colSpan="8" className="p-2">
                            <table className="w-full text-sm text-left text-body text-xs">
                              <tbody>
                                {r.days.map((day) => {
                                  return (
                                    <tr className="odd:bg-gray-400/10" key={day.date}>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">{day.date}</td>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">
                                        RP {typeof day.total_amount === "string" ? day.total_amount : new Intl.NumberFormat("id-ID").format(day.total_amount)}
                                      </td>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">{day.total_claim}</td>
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

        <div className="flex-1">
          <div className="relative overflow-x-auto shadow-xs rounded mb-3">
            <table className="w-full text-sm text-left text-xs">
              <thead className="bg-cyan-900/50 text-white text-xs">
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">USER</th>
                  <th className="p-2">TOTAL AMOUNT</th>
                  <th className="p-2">TOTAL CLAIM</th>
                </tr>
              </thead>
              <tbody>
                {statement?.users?.data?.map((user, i) => {
                  return (
                    <Fragment key={i}>
                      <tr className="even:bg-gray-500/20" onClick={() => setOpenRow(openRow === user.name ? null : user.name)}>
                        <td className={`px-2 py-3 whitespace-nowrap ${user.name === name ? "text-cyan-400 font-bold" : "text-white"}`}>{i}</td>
                        <td className={`px-2 py-3 whitespace-nowrap ${user.name === name ? "text-cyan-400 font-bold" : "text-white"}`}>{user.name}</td>
                        <td className={`px-2 py-3 whitespace-nowrap ${user.name === name ? "text-cyan-400 font-bold" : "text-white"}`}>
                          RP {typeof user.total_amount === "string" ? user.total_amount : new Intl.NumberFormat("id-ID").format(user.total_amount)}
                        </td>
                        <td className={`px-2 py-3 whitespace-nowrap ${user.name === name ? "text-cyan-400 font-bold" : "text-white"}`}>{user.total_claim}</td>
                      </tr>

                      {user.name === openRow && (
                        <tr className="w-100">
                          <td />
                          <td colSpan="8" className="p-2">
                            <table className="w-full text-sm text-left text-body text-xs">
                              <tbody>
                                {user.days.map((day) => {
                                  return (
                                    <tr className="odd:bg-gray-400/10" key={day.date}>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">{day.date}</td>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">
                                        RP {typeof day.total_amount === "string" ? day.total_amount : new Intl.NumberFormat("id-ID").format(day.total_amount)}
                                      </td>
                                      <td className="py-2 px-2 text-white whitespace-nowrap">{day.total_claim}</td>
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
      </div>
    </>
  )
}
