import { useEffect, useState } from "react"
import { Sheet } from "react-modal-sheet"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

import { DEFAULT_IMAGE } from "../../config.js"
import { usePopupStore } from "../../store/popup.store.js"
import { useSessionStore } from "../../store/session.store.js"

import SheetAction from "./dashboard.sheet.action.jsx"

export default function SheetSession({ isOpen, setOpen, data, setData }) {
  const { removeSession, checkSession, getSessions } = useSessionStore((state) => state)
  const { showPopup, closePopup } = usePopupStore((state) => state)

  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRemoveSession = async (id) => {
    try {
      const { message } = await removeSession(id)
      await getSessions()

      setOpen(false)
      showPopup("SESSION REMOVED", message)
    } catch (error) {
      const { response } = error || {}
      const { data } = response || {}
      const { message } = data

      setOpen(false)
      showPopup("FAILED REMOVE SESSION", message)
    }
  }

  const handleUpdateSession = async (id) => {
    try {
      setLoading(true)
      const session = await checkSession(id)

      setData(session)
      setNote(JSON.stringify(session, null, 2))
    } catch (error) {
      const { response } = error || {}
      const { data } = response || {}
      const { message } = data

      setOpen(false)
      showPopup("CANNOT UPDATE SESSION", message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setNote(JSON.stringify(data || {}, null, 2))
  }, [data])

  return (
    <>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} disableDrag={true} detent="content-height" avoidKeyboard={false}>
        <Sheet.Backdrop onTap={() => setOpen(false)} className="!bg-black/20 backdrop-blur-sm" />
        <Sheet.Container className="!bg-neutral-800 !text-white">
          <Sheet.Header className="flex flex-col rounded-t-lg px-3 mb-3">
            <Sheet.Header />
            <div className="flex flex-row gap-3">
              <div className="flex justify-center items-center w-[120px]">
                <img
                  src={data?.data?.avatarUrl || DEFAULT_IMAGE}
                  alt={data?.data?.avatarUrl || DEFAULT_IMAGE}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = DEFAULT_IMAGE
                  }}
                  className="w-full rounded-lg aspect-square object-cover border-2 border-white-500/50"
                />
              </div>

              <div className="flex flex-col justify-between w-full min-w-0">
                <div>
                  <p className="text-sm font-bold truncate">{data?.data?.name}</p>
                  <p className="text-[0.6rem] text-neutral-400 font-bold truncate">{data?.user_data?.alias}</p>
                  <p className="text-[0.6rem] text-neutral-400 font-bold truncate">
                    USER ROOM {data?.user_data?.room?.toUpperCase()} WITH ROLE {data?.user_data?.role?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-[0.6rem] text-neutral-300 font-bold truncate">
                    {data?.data?.balanceDisplay?.status} {data?.data?.balanceDisplay?.statusText?.toUpperCase()}
                  </p>
                  <p className="text-[0.6rem] text-yellow-500 font-bold truncate">RP {data?.data?.balanceDisplay?.amount}</p>
                </div>
              </div>
            </div>
          </Sheet.Header>
          <Sheet.Content className="py-1 px-2 border-0">
            <div className={`flex items-center w-full justify-center h-56 w-56 text-fg-brand-strong text-xs font-medium rounded-base ${loading ? "" : "hidden"}`}>
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

            <div className={`w-full max-h-[30vh] overflow-auto rounded-xl border border-zinc-800 mb-3 p-3 py-4 ${loading ? "hidden" : ""}`} style={{ background: "#18181b" }}>
              <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ margin: 0, padding: "5px", background: "#18181b", fontSize: "0.6rem" }}>
                {note}
              </SyntaxHighlighter>
            </div>

            <div className="flex flex-col gap-3">
              <SheetAction
                onClick={() => handleRemoveSession(data?.id)}
                text="REMOVE SESSION"
                color="text-red-500"
                icon="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              />
              <SheetAction
                onClick={() => handleUpdateSession(data?.id)}
                text="CHECK SESSION"
                color="text-white-400"
                icon="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
              />

              <SheetAction
                onClick={() => setOpen(false)}
                text="CLOSE"
                color="text-white-500"
                icon="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              />
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  )
}
