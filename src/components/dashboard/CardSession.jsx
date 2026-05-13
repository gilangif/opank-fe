import { DEFAULT_IMAGE } from "../../config.js"

export default function CardSession({ name, alias, role, room, balance, avatar, status, data, setSessionData, setSheetSessionOpen }) {
  const handleUserSheet = () => {
    setSessionData(data)
    setSheetSessionOpen(true)
  }

  const status_bg = status === "invalid" ? "bg-yellow-400/20 hover:bg-yellow-400/80" : status === "Unauthorized" ? "bg-red-900/40 hover:bg-red-900/80" : "hover:bg-gray-100/20"

  return (
    <div className={`flex flex-row h-[76px] p-1 gap-2 ${status_bg} transition duration-700 ease-in-out rounded-lg`}>
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
          <p className="text-[10px] hover:text-yellow-300">RP {balance}</p>
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
