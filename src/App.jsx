import { useState } from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import { useUserStore } from "./store/user.js"

import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"

import Layout from "./layout/Layout.jsx"

import Login from "./pages/Login.jsx"
import One from "./pages/One.jsx"
import Two from "./pages/Two.jsx"
import Three from "./pages/Three.jsx"
import Four from "./pages/Four.jsx"
import Five from "./pages/Five.jsx"

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
          <Route path="/" element={<One />} />
          <Route path="/chats" element={<Two />} />
          <Route path="/monitor" element={<Three />} />
          <Route path="/claims" element={<Four />} />
          <Route path="/groups" element={<Five />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
