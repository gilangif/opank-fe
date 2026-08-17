import { useState } from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import { useUserStore } from "./store/user.store.js"

import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"

import Layout from "./layout/Layout.jsx"

import Dashboard from "./pages/pages.dashboard.jsx"
import Statement from "./pages/pages.statement.jsx"
import Monitor from "./pages/pages.monitor.jsx"
import Config from "./pages/pages.config.jsx"
import Claim from "./pages/pages.claims.jsx"
import Login from "./pages/pages.login.jsx"
import Group from "./pages/pages.group.jsx"

import Two from "./pages/Two.jsx"

import "./App.css"

function Protected() {
  const accessToken = useUserStore((state) => state.accessToken)

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

function Guest() {
  const accessToken = useUserStore((state) => state.accessToken)

  if (accessToken) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function App() {
  return (
    <Routes>
      <Route element={<Guest />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<Protected />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chats" element={<Two />} />
          <Route path="/monitor" element={<Monitor />} />
          <Route path="/claims" element={<Claim />} />
          <Route path="/groups" element={<Group />} />
          <Route path="/config" element={<Config />} />
          <Route path="/statement" element={<Statement />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
