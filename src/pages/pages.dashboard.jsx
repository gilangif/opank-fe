import { useEffect, useState } from "react"

import { useUserStore } from "../store/user.store.js"
import { usePopupStore } from "../store/popup.store.js"
import { useSessionStore } from "../store/session.store.js"
import { useDeviceStore } from "../store/device.store.js"

import CardRecommend from "../components/dashboard/dashboard.card.recommend.jsx"
import CardSession from "../components/dashboard/dashboard.card.session.jsx"
import CardDevice from "../components/dashboard/dashboard.card.action.jsx"
import SheetSession from "../components/dashboard/dashboard.sheet.session.jsx"
import SheetDevice from "../components/dashboard/dashboard.sheet.device.jsx"

import axios from "axios"
import { useGroupStore } from "../store/group.store.js"

function BalanceCard({ balance }) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-cyan-700/40 bg-gradient-to-br from-slate-900 via-sky-950 to-cyan-950 p-5 shadow-lg sm:p-6">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">
        {/* ================= BALANCE ================= */}
        <div className="pr-0 sm:pr-[45%] lg:pr-[45%]">
          <p className="text-sm font-medium text-slate-300">TOTAL SALDO</p>

          <div className="mt-2 flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Rp {balance}</h2>

            <button className="text-slate-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <p className="mt-1 text-sm text-slate-400">Saldo tersedia</p>
        </div>

        {/* ================= DEBIT CARD ================= */}
        <div
          className="
            relative mt-6
            h-44 w-full
            sm:absolute sm:right-6 sm:top-6 sm:mt-0
            sm:h-40 sm:w-[300px]
            lg:right-8 lg:top-7
            lg:h-44 lg:w-[330px]
          "
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-600 via-blue-800 to-slate-950 p-5 shadow-xl">
            {/* Decorative circles */}
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-white/10" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide text-blue-100">DEBIT CARD</span>

                <span className="text-lg font-bold italic text-white">VISA</span>
              </div>

              {/* Chip */}
              <div className="h-8 w-11 rounded-md border border-yellow-200/40 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600">
                <div className="mt-2 border-t border-yellow-800/30" />
                <div className="mt-1 border-t border-yellow-800/30" />
              </div>

              {/* Card number */}
              <div>
                <p className="font-mono text-xs tracking-[0.15em] text-white sm:text-sm">1234 1234 5678 9012</p>

                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] uppercase text-blue-200">Card Holder</p>

                    <p className="text-[10px] font-medium text-white sm:text-xs">GILANG IDUL FITRI</p>
                  </div>

                  <div>
                    <p className="text-[8px] text-blue-200">EXPIRES</p>

                    <p className="text-[10px] text-white sm:text-xs">12/28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACTION ================= */}
        <div
          className="
            mt-6
            grid grid-cols-3
            divide-x divide-slate-700/70
            sm:mt-5
            lg:mt-8
          "
        >
          {/* Top Up */}
          <button className="group flex flex-col items-center gap-2 text-slate-300 transition hover:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/70 transition group-hover:border-cyan-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>

            <span className="text-xs font-medium">Top Up</span>
          </button>

          {/* Transfer */}
          <button className="group flex flex-col items-center gap-2 text-slate-300 transition hover:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/70 transition group-hover:border-cyan-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
              </svg>
            </div>

            <span className="text-xs font-medium">Transfer</span>
          </button>

          {/* Riwayat */}
          <button className="group flex flex-col items-center gap-2 text-slate-300 transition hover:text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-600 bg-slate-800/70 transition group-hover:border-cyan-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h6m-6 4h6m-6 4h6m-6 4h6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h.01M5 9h.01M5 13h.01M5 17h.01" />
              </svg>
            </div>

            <span className="text-xs font-medium">Riwayat</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [isSheetSessionOpen, setSheetSessionOpen] = useState(false)
  const [isSheetDeviceOpen, setSheetDeviceOpen] = useState(false)

  const [sessionData, setSessionData] = useState({})
  const [deviceData, setDeviceData] = useState({})

  const { sessions, getSessions } = useSessionStore((state) => state)
  const { room, accessToken } = useUserStore((state) => state)
  const { onlines, offlines, getDevices } = useDeviceStore((state) => state)
  const { recommend, getRecommend } = useGroupStore((state) => state)

  useEffect(() => {
    document.title = "OPANK HOME"

    getRecommend()
  }, [])

  return (
    <>
      <SheetSession isOpen={isSheetSessionOpen} setOpen={setSheetSessionOpen} data={sessionData} setData={setSessionData} />
      <SheetDevice isOpen={isSheetDeviceOpen} setOpen={setSheetDeviceOpen} data={deviceData} />

      <div className="flex flex-col gap-5 px-2">
        {/* RECOMMENDED GROUP */}

        <div className="flex flex-row gap-2 overflow-x-auto snap-x scrollbar-hide">
          {recommend.map((data, i) => {
            return <CardRecommend key={i} data={data.data} />
          })}
        </div>

        <BalanceCard />

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

            <p className="text-[0.75rem] font-bold">{sessions.length} SESSION REGISTERED</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1">
            {sessions.map((session, i) => {
              const { id, user_id, user_data, data, created_at, updated_at, ALIPAYJSESSIONID } = session
              const { name, nickname, balance, balanceDisplay } = data

              return (
                <CardSession
                  key={i}
                  name={name}
                  alias={user_data.alias}
                  role={user_data.role}
                  room={user_data.room}
                  balance={balanceDisplay.amount}
                  status={balanceDisplay.statusText}
                  avatar={data.avatarUrl}
                  data={session}
                  setSessionData={setSessionData}
                  setSheetSessionOpen={setSheetSessionOpen}
                />
              )
            })}
          </div>
        </div>

        {/* DEVICE SESSION */}

        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <div className="px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M10.5 18a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                <path
                  fillRule="evenodd"
                  d="M7.125 1.5A3.375 3.375 0 0 0 3.75 4.875v14.25A3.375 3.375 0 0 0 7.125 22.5h9.75a3.375 3.375 0 0 0 3.375-3.375V4.875A3.375 3.375 0 0 0 16.875 1.5h-9.75ZM6 4.875c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-9.75A1.125 1.125 0 0 1 6 19.125V4.875Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-[0.75rem] font-bold">{onlines.length} DEVICE CONNECTED</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {onlines.map((online, i) => {
              const { id, name, alias, username, role, room, uid, mode, avatar, created_at, updated_at, socket_id, start } = online

              return (
                <CardDevice
                  key={i}
                  name={name}
                  alias={alias}
                  role={role}
                  room={room}
                  start={start}
                  socket_id={socket_id}
                  avatar={avatar}
                  uid={uid}
                  mode={mode}
                  data={online}
                  setDeviceData={setDeviceData}
                  setSheetDeviceOpen={setSheetDeviceOpen}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
