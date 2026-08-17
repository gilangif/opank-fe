import { useState } from "react"
import { useNavigate } from "react-router-dom"

function VisaCard({ name, color }) {
  const style =
    color === "red"
      ? " border border-red-200/15 bg-gradient-to-br from-[#7b292b] via-[#54191c] to-[#160708] p-3 shadow-2xl"
      : color === "blue"
        ? "border border-blue-200/[0.16] bg-gradient-to-br from-[#172b3d] via-[#08131f] to-[#02070c] p-3 shadow-2xl shadow-black/80"
        : color === "green"
          ? "border border-emerald-200/[0.16] bg-gradient-to-br from-[#17382e] via-[#081914] to-[#020806] p-3 shadow-2xl shadow-black/80"
          : "border border-white/[0.16] bg-gradient-to-br from-[#3a3a3a] via-[#111111] to-[#020202] p-3 shadow-2xl shadow-black/80"

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl ${style}`}>
      <div className="pointer-events-none absolute -left-[35%] top-[-80%] h-[220%] w-[45%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/[0.10] to-transparent blur-xl" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-black/60" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute -left-[20%] top-[25%] h-px w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="absolute -left-[20%] top-[29%] h-px w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute -left-[20%] top-[70%] h-px w-[140%] rotate-[8deg] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full border border-white/[0.10]" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/[0.06]" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[7px] font-semibold tracking-wide text-white/90 sm:text-xs">DEBIT CARD</span>
          <span className="text-[7px] font-bold italic tracking-wide text-white/80 sm:text-xs">BANK OYEN</span>
        </div>

        <div className="h-5 w-8 overflow-hidden rounded-sm border border-yellow-100/40 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700 shadow-md">
          <div className="mt-[5px] border-t border-yellow-900/40" />
          <div className="mt-[4px] border-t border-yellow-900/40" />
          <div className="absolute ml-4 mt-[-20px] h-7 border-l border-yellow-900/30" />
        </div>

        <div>
          <p className="font-mono text-[7px] tracking-[0.16em] text-white sm:text-xs">1234 4567 8910 1112</p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[6px] uppercase tracking-wider text-white/50 sm:text-[7px]">Card Holder</p>
              <p className="mt-0 text-[6px] font-medium tracking-wide text-white sm:text-[10px] uppercase">{name}</p>
            </div>

            <div>
              <p className="text-[6px] uppercase text-white/50 sm:text-[7px]">VALID THRU</p>
              <p className="mt-0 text-[6px] text-white sm:text-[10px]">12/28</p>
            </div>

            <div className="relative flex h-5 w-8 items-center justify-center">
              <div className="absolute left-0 h-5 w-5 rounded-full bg-red-500" />
              <div className="absolute right-0 h-5 w-5 rounded-full bg-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CardBalance({ balance, name, todayAmount, todayClaim, monthAmount, monthClaim }) {
  const navigate = useNavigate()

  const [hide, setHide] = useState(false)

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#0b0b0b] via-[#171011] to-[#461417] shadow-2xl shadow-black/50">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-red-700/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-[25%] top-[35%] h-60 w-60 rounded-full bg-red-900/10 blur-[100px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute right-[-10%] top-[10%] h-[2px] w-[55%] rotate-[-12deg] bg-gradient-to-r from-transparent via-red-300 to-transparent blur-sm" />
        <div className="absolute right-[-5%] top-[18%] h-[1px] w-[50%] rotate-[-12deg] bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        <div className="absolute right-[5%] top-[25%] h-[1px] w-[45%] rotate-[-12deg] bg-gradient-to-r from-transparent via-red-300 to-transparent" />

        <div className="absolute right-[-5%] top-[55%] h-[1px] w-[50%] rotate-[10deg] bg-gradient-to-r from-transparent via-red-300 to-transparent" />
        <div className="absolute right-[10%] top-[65%] h-[1px] w-[40%] rotate-[10deg] bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      </div>

      <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between sm:p-2">
        <div className="flex justify-between gap-1 flex-row p-3 item-center">
          <div className="flex flex-col justify-between flex-1 px-2">
            <div>
              <p className="text-[9px] font-medium tracking-wide text-white/80">BALANCE</p>

              <div className="mt-1 flex items-center gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">Rp {hide ? "-" : Number(balance).toLocaleString("id-ID")}</h2>

                <button className="flex h-5 w-5 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white" onClick={() => setHide(!hide)}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z" />

                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col my-2 sm:my-4 gap-0">
                <p className="text-[9px] text-white/90">Today Rp. {hide ? "-" : `${new Intl.NumberFormat("id-ID").format(todayAmount)} (${todayClaim} claim)`}</p>
                <p className="text-[9px] text-white/60">This month Rp. {hide ? "-" : `${new Intl.NumberFormat("id-ID").format(monthAmount)} (${monthClaim} claim)`}</p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <a href="/claims">
                <button className="flex items-center gap-2 text-white/80 transition hover:text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-inner transition hover:border-white/20 group-hover:bg-white/10">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />

                      <path strokeLinecap="round" strokeLinejoin="round" d="m13 6 6 6-6 6" />
                    </svg>
                  </div>

                  <span className="text-[8px] font-medium">CLAIMS</span>
                </button>
              </a>

              <a href="/statement">
                <button className="flex items-center gap-2  text-white/80 transition hover:text-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] shadow-inner transition group-hover:border-white/20 group-hover:bg-white/10">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="5" y="3" width="14" height="18" rx="2" />

                      <path strokeLinecap="round" d="M9 8h6M9 12h6M9 16h4" />
                    </svg>
                  </div>

                  <span className="text-[8px] font-medium">STATEMENT</span>
                </button>
              </a>
            </div>
          </div>

          <div className="">
            <div className="relative w-[160px] h-[110px] sm:h-[165px] sm:w-[280px] lg:h-[175px] lg:w-[300px]">
              <div className="absolute inset-0 translate-y-3 rounded-2xl bg-black/70 blur-xl" />

              <VisaCard name={name} color={balance < 50000 ? "green" : balance < 300000 ? "red" : balance < 500000 ? "blue" : "black"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
