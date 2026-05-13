
export default function SheetAction({ icon, text, color, onClick }) {
  return (
    <div className="flex flex-row gap-4 items-center py-3 px-2 rounded-lg hover:bg-neutral-100/20 hover:text-yellow-500 transition duration-500" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 ${color}`}>
        <path fillRule="evenodd" d={icon} clipRule="evenodd" />
      </svg>

      <div className="w-full">
        <p className="text-[0.8rem] font-bold">{text}</p>
      </div>
    </div>
  )
}