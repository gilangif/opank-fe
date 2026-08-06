import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { API_1 } from "../config.js"

import { useUserStore } from "../store/user.store.js"

import axios from "axios"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [note, setNote] = useState("")

  const login = useUserStore((state) => state.login)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      setNote("")

      await login(username, password)

      navigate("/")
    } catch (error) {
      const { response } = error || {}
      const { data } = response || {}
      const { message } = data

      setNote(message)
    }
  }

  useEffect(() => {
    document.title = "OPANK LOGIN"
  }, [])

  return (
    <>
      <div className="h-[100dvh] overflow-hidden bg-black text-white relative">
        <div className="flex justify-center flex-col items-center gap-3 absolute inset-0 bg-gradient-to-b from-black via-black to-lime-900/50">
          <img src="https://media.tenor.com/TQTVSmxhX5kAAAAi/apu-apustaja-apu.gif" className="w-[120px] aspect-square object-cover" alt="" />

          <div className="flex flex-col items-center mb-2">
            <p className="text-white text-[1.2rem] font-bold">Welcome back !</p>
            <p className="text-white text-[0.7rem] font-bold !text-red-500">{note}</p>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className="flex flex-col gap-3 min-w-[60vw] md:min-w-0">
              <div className="flex shadow-xs rounded-base rounded">
                <input
                  type="text"
                  className="rounded rounded-md block w-full px-2 py-2 text-black text-heading text-sm focus:ring-brand focus:border-brand placeholder:text-[0.7rem] placeholder:text-body"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="flex shadow-xs rounded-base rounded">
                <input
                  type="password"
                  className="rounded rounded-md block w-full px-2 py-2 text-black text-heading text-sm focus:ring-brand focus:border-brand placeholder:text-[0.7rem] placeholder:text-body"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <button className="bg-green-600/60 block w-full rounded-lg py-2 border-[1px] border-gray-500/50 font-bold text-[0.7rem] mt-2">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
