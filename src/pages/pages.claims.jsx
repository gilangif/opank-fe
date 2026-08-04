import { Fragment, useEffect, useState } from "react"
import { useClaimStore } from "../store/claim.store.js"

export default function Claims() {
  const { logs, getLogs } = useClaimStore((state) => state)

  const [openRow, setOpenRow] = useState(null)

  useEffect(() => {
    getLogs()
  }, [])

  return (
    <>
      <div className="m-2">
        <div className="relative overflow-x-auto shadow-xs rounded ">
          <table className="w-full text-sm text-left text-[0.65em]">
            <thead className="text-sm bg-yellow-900 text-xs">
              <tr>
                <th scope="col" className="p-2">
                  ID
                </th>
                <th scope="col" className="p-2">
                  BATCH
                </th>
                <th scope="col" className="p-2">
                  CODE
                </th>
                <th scope="col" className="p-2">
                  LINK
                </th>
                <th scope="col" className="p-2">
                  STATUS
                </th>
                <th scope="col" className="p-2">
                  SENDER
                </th>
                <th scope="col" className="p-2">
                  GROUP
                </th>
                <th scope="col" className="p-2">
                  CLAIMS
                </th>
                <th scope="col" className="p-2">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => {
                const { claims } = log

                return (
                  <Fragment>
                    <tr className="even:bg-yellow-400/10 hover:bg-gray-500" key={i} onClick={() => setOpenRow(openRow === log.id ? null : log.id)}>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.id}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.order_id}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.code.toUpperCase()}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.link}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.status}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.sender}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.group_title}</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{log.claims.length} USERS</td>
                      <td className="px-2 py-2 text-heading whitespace-nowrap">{new Date(log.created_at * 1000).toLocaleDateString()}</td>
                    </tr>

                    {openRow === log.id && (
                      <tr className="w-100 bg-gray-500">
                        <td colSpan={9} className="p-4">
                          <table className="w-full text-sm text-left text-body text-xs">
                            <thead>
                              <tr className="border-b">
                                <th>SESSION</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>USER</th>
                                <th>ROOM</th>
                                <th>ROLE</th>
                                <th>Time</th>
                              </tr>
                            </thead>

                            <tbody>
                              {claims.map((claim) => {
                                const { user, order } = claim

                                return (
                                  <tr key={order.id}>
                                    <td>{order.claim_name}</td>
                                    <td>{order.claim_amount}</td>
                                    <td>{order.claim_status}</td>
                                    <td>{user.alias}</td>
                                    <td>{user.room}</td>
                                    <td>{user.role}</td>
                                    <td>{order.created_at}</td>
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
