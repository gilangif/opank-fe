import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"

export default function Layout() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px", paddingBottom: "100px" }}>
        <Outlet />
      </main>
    </div>
  )
}
