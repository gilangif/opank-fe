import { useEffect, useState } from "react"
import { useGroupStore } from "../../store/group.store.js"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function GroupDialogDetail({ open, setOpen, detail }) {
  const { accounts, lists, details, listData, getLists, getAccounts, getInviteDetail, inviteAction } = useGroupStore((state) => state)

  useEffect(() => {
    if (!open) return
    if (!detail.link) return
    if (detail.user) return
    if (detail.bot) return

    getInviteDetail(detail.link)
  }, [detail])

  if (!open) return

  if (detail.user)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
        <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/80" />

        <div className="relative w-full max-w-full h-[90vh] overflow-y-auto overflow-x-hidden rounded-xl shadow-xl flex flex-col gap-1">
          <div className="shrink-0 p-2">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ margin: 0, padding: "5px", background: "#18181b", fontSize: "0.6rem" }}>
                {JSON.stringify(detail, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
            <div className="shrink-0 p-2">
              <div id="alert-4" className="flex smitems-center flex items-center p-4 mb-4 text-sm text-fg-warning rounded-base bg-warning-soft" role="alert">
                <svg className="w-4 h-4 shrink-0 mt-0.5 md:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-2 text-sm ">
                  Cannnot get invite detail cause <span className="font-bold">{detail.code}</span> is user or bot.
                </div>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 focus:ring-warning-medium p-1.5 hover:bg-warning-medium inline-flex items-center justify-center h-8 w-8 shrink-0 shrink-0"
                  data-dismiss-target="#alert-4"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 px-5 py-3 flex justify-end">
              <button onClick={() => setOpen(false)} className="rounded-lg bg-yellow-500/40 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-500/60">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/80" />

      <div className="relative w-full max-w-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-xl shadow-xl flex flex-col gap-1">
        <div className="p-2">
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default max-h-[30vh]">
            <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ margin: 0, padding: "5px", background: "#18181b", fontSize: "0.6rem" }}>
              {JSON.stringify(detail, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="p-2">
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="bg-neutral-secondary-soft border-b border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Key
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, i) => {
                  const color =
                    detail.status === "INVITE LINK IS USER" || detail.status === "ERROR"
                      ? "text-red-500 font-bold"
                      : detail.status === "INVITE LINK IS USER"
                        ? "text-gray-500 font-bold"
                        : detail.status === "JOINED"
                          ? "text-green-500 font-bold"
                          : "text-body"

                  const button =
                    detail.action === "join"
                      ? "bg-success hover:bg-success-strong focus:ring-success-medium"
                      : detail.action === "leave"
                        ? "bg-danger hover:bg-danger-strong focus:ring-danger-medium"
                        : ""

                  return (
                    <tr className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default" key={i}>
                      <th scope="row" className="px-6 py-2 font-medium text-heading whitespace-nowrap">
                        {detail.account.key}
                      </th>
                      <td className="px-6 py-2">{detail.account.name}</td>
                      <td className={`px-6 py-2 ${color}`}>{detail.status}</td>
                      <td className="px-6 py-2">
                        {!detail.action ? (
                          ""
                        ) : (
                          <button
                            type="button"
                            className={`text-white box-border border border-transparent focus:ring-4 shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-1 focus:outline-none ${button}`}
                            onClick={() => inviteAction(detail.account.key, detail.link, detail.action)}
                          >
                            {detail.action.toUpperCase()}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-3 flex justify-end">
          <button onClick={() => setOpen(false)} className="rounded-lg bg-yellow-500/40 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-500/60">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}
