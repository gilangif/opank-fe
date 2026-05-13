import { useEffect, useState } from "react"
import { DEFAULT_IMAGE } from "../../config.js"

export default function CardDevice({ name, alias, role, room, start_time, socket_id, avatar, data, setDeviceData, setSheetDeviceOpen }) {
  const [duration, setDuration] = useState("")

  const handleUserSheet = () => {
    setDeviceData(data)
    setSheetDeviceOpen(true)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const c = new Date() - new Date(start_time)

      const h = Math.floor(c / (1000 * 60 * 60))
      const m = Math.floor((c % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((c % (1000 * 60)) / 1000)

      setDuration(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [start_time])

  return (
    <div className="flex flex-row h-[76px] p-1 gap-2 hover:bg-gray-100/20 transition duration-700 ease-in-out rounded-lg">
      <div className="flex justify-center items-center rounded-lg aspect-square">
        <img
          src={avatar || DEFAULT_IMAGE}
          alt=""
          srcSet=""
          onError={(e) => {
            e.target.onerror = null
            e.target.src = DEFAULT_IMAGE
          }}
          className="w-full h-full object-cover rounded-lg border-[1px] border-gray-500 hover:border-yellow-500/80"
        />
      </div>

      <div className="flex flex-col w-full px-1 justify-around min-w-0">
        <div>
          <p className="text-[0.65rem] font-bold hover:text-yellow-500 truncate">{name}</p>
          <p className="text-[10px] font-semibold hover:text-yellow-300">{alias}</p>
        </div>
        <div>
          <p className="text-[10px] hover:text-yellow-300">
            {role} {room}
          </p>
          <p className="text-[10px] hover:text-yellow-300">TIME {duration}s</p>
        </div>
      </div>

      <div className="flex justify-center items-center px-2">
        <div onClick={() => handleUserSheet()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-yellow-500 transition duration-500">
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
