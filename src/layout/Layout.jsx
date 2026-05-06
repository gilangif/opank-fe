import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"
import Header from "../components/Header"

export default function Layout() {
  return (
    <div className="h-[100dvh] overflow-hidden bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-purple-900/40"></div>

      <div className="relative z-index-999">
        <Header />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
