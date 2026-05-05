import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import { useStore } from "./store/store"

import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"

import Layout from "./layout/Layout.jsx"

import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App
