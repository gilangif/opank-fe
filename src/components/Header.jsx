import { Sheet } from "react-modal-sheet"
import { useEffect, useRef, useState } from "react"

import { useUserStore } from "../store/user.store.js"
import { useSessionStore } from "../store/session.store.js"
import { usePopupStore } from "../store/popup.store.js"
import { useDeviceStore } from "../store/device.store.js"

import { API_1, DEFAULT_IMAGE_PROFILE } from "../config.js"
import { useNavigate } from "react-router-dom"

function SessionBox({ isOpen, setOpen }) {
  const [text, setText] = useState("")
  const [ALIPAYJSESSIONID, setALIPAYJESSIONID] = useState("")

  const { showPopup, closePopup } = usePopupStore((state) => state)

  const { accessToken, room } = useUserStore((state) => state)
  const { sessions, addSession, getSessions } = useSessionStore((state) => state)

  const regex = /GZ00[a-zA-Z0-9]{32}danabizpluginGZ00/g

  const handleAddSession = async () => {
    setOpen(false)

    const { data, message, user } = await addSession(ALIPAYJSESSIONID)

    showPopup("SESSIONS UPDATED", message)
    getSessions()
  }

  useEffect(() => {
    if (!text) return setALIPAYJESSIONID("INPUT ALIPAYJSESSIONID")

    setALIPAYJESSIONID("NOT FOUND")

    const match = text.match(regex)

    if (match) {
      setALIPAYJESSIONID(match[0])
    }
  }, [text])

  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} disableDrag={true} detent="content-height" avoidKeyboard={false}>
      <Sheet.Backdrop onTap={() => setOpen(false)} className="!bg-black/20 backdrop-blur-sm" />
      <Sheet.Container className="!bg-neutral-800 !text-white">
        <Sheet.Header className="flex flex-row rounded-t-lg py-2">
          <div className="flex flex-col justify-center items-start px-3 gap-1">
            <p className="m-0 p-0 text-sm font-bold">ADD SESSIONS</p>
            <p className={`m-0 p-0 text-white text-[0.6rem] ${ALIPAYJSESSIONID === "NOT FOUND" ? "text-red-600 font-bold" : text && ALIPAYJSESSIONID ? "text-green-500 font-bold" : ""}`}>
              {ALIPAYJSESSIONID || "INPUT ALIPAYJSESSIONID"}
            </p>
          </div>

          <div className="flex flex-1 justify-end rounded-lg px-5 py-1 gap-5">
            <div className={`flex items-center justify-center ${text && ALIPAYJSESSIONID && ALIPAYJSESSIONID !== "NOT FOUND" ? "!block" : "!hidden"}`} onClick={() => handleAddSession()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 hover:text-green-500">
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8 hover:text-yellow-500"
                onClick={() => {
                  setText("")
                  setALIPAYJESSIONID("")
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="flex items-center justify-center" onClick={() => setOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 hover:text-red-500">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Content className="p-2 border-0">
          <textarea
            id="message"
            rows="4"
            className="w-full h-[40vh]  border border-default-medium  text-black text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-white"
            placeholder="Paste sessions here.."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}

export default function Header() {
  const [isOpen, setOpen] = useState(false)

  const { name, alias, username, room, role, avatar } = useUserStore((state) => state)
  const { sessions, addSession, getSessions } = useSessionStore((state) => state)
  const { onlines, offlines, getDevices } = useDeviceStore((state) => state)

  const navigate = useNavigate()

  useEffect(() => {
    getSessions()
    getDevices()
  }, [])

  return (
    <>
      <SessionBox isOpen={isOpen} setOpen={setOpen} />
      <div className="h-full rounded-b-base">
        <nav className="after:pointer-events-none">
          <div className="flex items-center justify-between py-4 px-2">
            <div className="flex justify-center items-center gap-3">
              <div className="flex items-center justify-center ml-1">
                <img
                  src={avatar || DEFAULT_IMAGE_PROFILE}
                  alt={avatar || DEFAULT_IMAGE_PROFILE}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = DEFAULT_IMAGE_PROFILE
                  }}
                  className="size-8 rounded-full border-2 bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center">
                <h1 className="text-white text-sm font-bold">HI, {name}</h1>
                <p className="text-gray-300 text-[11px]">community {room}, role {role}</p>
              </div>
            </div>

            <div className="flex gap-4 px-1">
              <div className="flex items-center justify-center" onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white hover:text-yellow-500 size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>

              <div className="flex items-center justify-center" onClick={() => navigate("/config")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-yellow-500 size-6">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
