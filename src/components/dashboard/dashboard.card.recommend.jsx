import { useNavigate } from "react-router-dom"
import { DEFAULT_IMAGE_THUMBS } from "../../config.js"

export default function CardRecommend({ data }) {
  const { title, member, preview, chats, user, bot, dana, thumb, link, code } = data || {}

  const navigate = useNavigate()

  const containDana = dana || chats.some((chat) => chat.toLowerCase().includes("danakaget") || chat.toLowerCase().includes("orderid"))

  return (
    <div className="flex flex-col justify-center items-center snap-start shrink-0 w-[110px] md:w-[200px] gap-1">
      <div className="relative">
        <div className="absolute bottom-2 right-2 flex gap-1 flex-wrap justify-end">
          <div className="flex gap-2">
            <span className={`px-2.5 py-0.5 rounded-full bg-green-500/70 text-white text-xs ${preview ? "" : "hidden"}`}>PREVIEW</span>
            <span className={`px-2.5 py-0.5 rounded-full bg-blue-500/70 text-white text-xs ${containDana ? "" : "hidden"}`}>CONTAIN DANA</span>
          </div>
        </div>
        <a href={link}>
          <img
            src={thumb || DEFAULT_IMAGE_THUMBS}
            onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE_THUMBS)}
            className="w-full h-full aspect-square rounded-lg hover:border-2 hover:border-yellow-500/50"
          />
        </a>
      </div>
      <div className="w-full px-1">
        <p className="text-[0.7rem] font-bold truncate hover:text-yellow-500" onClick={() => navigate(`/groups?search=${code}`)}>
          {title || "UNKNOWN GROUP"}
        </p>
        <p className="text-[0.6rem] hover:text-yellow-300">{member} subsribers</p>
      </div>
    </div>
  )
}
