import { DEFAULT_IMAGE_THUMBS } from "../../config.js"
import { useState } from "react"
import { useGroupStore } from "../../store/group.store.js"

export default function GroupCard({ data, setDetail, setOpen }) {
  const { id, thumb, link, code, title, description, member = 0, preview, dana, user, bot, group, is_mark, invites, chats = [] } = data
  const { setMark } = useGroupStore((state) => state)

  const [marker, setMarker] = useState(() => is_mark)

  const containDana = dana || chats.some((chat) => chat.toLowerCase().includes("danakaget") || chat.toLowerCase().includes("orderid"))

  const handleMarker = async () => {
    const mark = marker === 0 ? 1 : 0
    const data = await setMark(id, mark)

    setMarker(data.detail.is_mark)
  }

  return (
    <div className={`${marker === 1 ? "bg-stone-300/80" : "bg-gray-300"} block p-2 border border-default rounded-base shadow-xs flex flex-col`}>
      <div>
        <div className="relative">
          <img
            className="rounded-base aspect-square object-cover"
            src={thumb || DEFAULT_IMAGE_THUMBS}
            onDoubleClick={() => handleMarker()}
            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_THUMBS)}
          />

          <div className="absolute top-2 right-2 flex gap-1 flex-wrap justify-end">
            <span className={`px-2.5 py-1 rounded-full bg-orange-500/70 text-white text-xs ${user ? "" : "hidden"}`}>USER</span>
            <span className={`px-2.5 py-1 rounded-full bg-yellow-500/70 text-white text-xs ${bot ? "" : "hidden"}`}>BOT</span>
          </div>

          <div className="absolute bottom-2 right-2 flex gap-2 flex-wrap justify-end">
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-full bg-black text-white text-xs">{member} MEMBER</span>
            </div>
            <div className="flex gap-2">
              <span className={`px-2.5 py-1 rounded-full bg-green-500/70 text-white text-xs ${preview ? "" : "hidden"}`}>PREVIEW</span>
              <span className={`px-2.5 py-1 rounded-full bg-blue-500/70 text-white text-xs ${containDana ? "" : "hidden"}`}>CONTAIN DANA</span>
            </div>
          </div>
        </div>

        <div className="px-1">
          <a href={link}>
            <p className="mt-3 text-sm font-semibold tracking-tight text-heading">{title || "UNREGISTER USERNAME"}</p>
          </a>
          <p className="mb-3 text-xs text-body line-clamp-2">{code}</p>
          <p className="mb-4 text-xs text-body line-clamp-2">{description.trim()}</p>
        </div>
      </div>
      <div className="mt-auto flex justify-between pr-3 items-center">
        <button
          className="inline-flex items-center text-body text-xs bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium rounded-base px-3 py-2 focus:outline-none"
          onClick={() => {
            setDetail(data)
            setOpen(true)
          }}
        >
          Read more
          <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>
        </button>

        <span className={`material-symbols-outlined cursor-pointer ${marker === 1 ? "text-red-500" : "text-white"}`} onClick={() => handleMarker()}>
          favorite
        </span>
      </div>
    </div>
  )
}
