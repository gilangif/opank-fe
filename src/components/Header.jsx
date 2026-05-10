import { Sheet } from "react-modal-sheet"
import { useEffect, useRef, useState } from "react"

function SessionBox({ isOpen, setOpen }) {
  const [text, setText] = useState("")
  const [ALIPAYJSESSIONID, setALIPAYJESSIONID] = useState("")

  const regex = /GZ00[a-zA-Z0-9]{32}danabizpluginGZ00/g

  const addSession = (ALIPAYJSESSIONID) => {
    try {
      console.log("📢[:12]: ", ALIPAYJSESSIONID)
      setOpen(false)
    } catch (error) {
      console.log("📢[:15]: ", error)
    }
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
          <div className="flex flex-col justify-center items-start px-3">
            <p className="m-0 p-0 text-sm font-bold">ADD SESSIONS</p>
            <p className={`m-0 p-0 text-white text-[9px] ${ALIPAYJSESSIONID === "NOT FOUND" ? "text-red-600 font-bold" : text && ALIPAYJSESSIONID ? "text-green-500 font-bold" : ""}`}>
              {ALIPAYJSESSIONID || "INPUT ALIPAYJSESSIONID"}
            </p>
          </div>
          <div className="flex flex-1 justify-end rounded-lg px-3 py-1 gap-6">
            <div className={`flex items-center justify-center ${ALIPAYJSESSIONID && ALIPAYJSESSIONID !== "NOT FOUND" ? "!block" : "!hidden"}`} onClick={() => addSession(ALIPAYJSESSIONID)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-green-500">
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
                className="size-6 hover:text-yellow-500"
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-red-500">
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
            placeholder="Paste sessions here..."
            className="w-full h-[30vh] rounded-lg border border-neutral-600 bg-neutral-900 p-2 text-[0.7rem] text-white placeholder:text-white-500 outline-none focus:border-yellow-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}

export default function Header() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <SessionBox isOpen={isOpen} setOpen={setOpen} />
      <div className="h-full">
        <nav className="after:pointer-events-none">
          <div className="flex items-center justify-between py-4 px-2">
            <div className="flex justify-center items-center gap-3">
              <div className="flex items-center justify-center ml-1">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-8 rounded-full border-2 bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center">
                <h1 className="text-white text-sm font-bold">Hi, Gilang Idul Fitri</h1>
                <p className="text-gray-300 text-[11px]">user role device</p>
              </div>
            </div>

            <div className="flex gap-4 px-1">
              <div className="flex items-center justify-center" onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white hover:text-yellow-500 size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
