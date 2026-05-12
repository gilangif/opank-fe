import { useEffect, useState } from "react"

import CardRecommend from "../components/one/CardRecommend.jsx"
import CardSession from "../components/one/CardSession.jsx"
import SheetUser from "../components/one/SheetUser.jsx"

export default function One() {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    document.title = "OPANK HOME"
  }, [])

  return (
    <>
      <SheetUser isOpen={isOpen} setOpen={setOpen} />

      <div className="flex flex-col gap-5 px-2">
        {/* RECOMMENDED GROUP */}

        <div className="flex flex-row gap-2 overflow-x-auto snap-x scrollbar-hide">
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
          <CardRecommend />
        </div>

        {/* USER SESSION */}

        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <div className="px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-[0.75rem] font-bold">30 USER REGISTERED</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1">
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="admin" room="gilang" balance="1.099.000" setOpen={setOpen} />
          </div>
        </div>

        {/* DEVICE SESSION */}

        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <div className="px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                <path d="M10.5 18a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fill-rule="evenodd"
                  d="M7.125 1.5A3.375 3.375 0 0 0 3.75 4.875v14.25A3.375 3.375 0 0 0 7.125 22.5h9.75a3.375 3.375 0 0 0 3.375-3.375V4.875A3.375 3.375 0 0 0 16.875 1.5h-9.75ZM6 4.875c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 0 1 6 19.125V4.875Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <p className="text-[0.75rem] font-bold">8 DEVICE CONNECTED</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1">
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="device" room="gilang" balance="249.000" />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="device" room="gilang" balance="249.000" />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="device" room="gilang" balance="249.000" />
            <CardSession name="GILANG IDUL FITRI" alias="081295026951" role="device" room="gilang" balance="249.000" />
          </div>
        </div>
      </div>
    </>
  )
}
