import { useEffect, useState } from "react"
import { Sheet } from "react-modal-sheet"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

import { DEFAULT_IMAGE } from "../../config.js"
import { usePopupStore } from "../../store/popup.js"
import { useSessionStore } from "../../store/session.js"

import SheetAction from "./SheetAction.jsx"

export default function SheetSession({ isOpen, setOpen, data }) {
  const { removeSession, checkSession, getSessions } = useSessionStore((state) => state)
  const { showPopup, closePopup } = usePopupStore((state) => state)

  const [note, setNote] = useState("")

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
      const session = await checkSession(id)

      setNote(JSON.stringify(session, null, 2))
    } catch (error) {
      const { response } = error || {}
      const { data } = response || {}
      const { message } = data

      setOpen(false)
      showPopup("CANNOT UPDATE SESSION", message)
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
            <div className="w-full max-h-[30vh] overflow-auto rounded-xl border border-zinc-800 mb-3 p-3 py-4" style={{ background: "#18181b" }}>
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
