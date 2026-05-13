import { usePopupStore } from "../store/popup"

export default function Popup() {
  const { open, title, detail, closePopup } = usePopupStore()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={closePopup} className="absolute inset-0 bg-black/60" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-gray-800 shadow-xl border border-white/10">
        <div className="px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-yellow-500/10">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-yellow-400">
                <path
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-white">{title}</h3>

              <p className="mt-2 text-sm text-gray-400">{detail}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-3 flex justify-end">
          <button onClick={closePopup} className="rounded-lg bg-yellow-500/40 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-500/60">
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}
