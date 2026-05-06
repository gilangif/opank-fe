import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import { useStore } from "./store/store"

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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<One />} />
        <Route path="/chats" element={<Two />} />
        <Route path="/monitor" element={<Three />} />
        <Route path="/claims" element={<Four />} />
        <Route path="/groups" element={<Five />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
