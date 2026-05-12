import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { API_1 } from "../config.js"

import { useUserStore } from "../store/user.js"

import axios from "axios"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [note, setNote] = useState("")

  const login = useUserStore((state) => state.login)

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setNote("")

      const { data } = await axios.post(API_1 + "/auth/users", { username, password })

      login(data.id, data.name, data.alias, data.username, data.role, data.room, data.avatar, data.accessToken)

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

          <div className="flex flex-col gap-3">
            <div className="flex shadow-xs rounded-base rounded">
              <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-l-lg border-default-medium border-e-0 rounded-s-base">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="rounded-none rounded-e-base block w-full px-2 py-2 border border-default-medium text-black text-heading text-sm rounded-r-lg focus:ring-brand focus:border-brand placeholder:text-[0.7rem] placeholder:text-body"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="flex shadow-xs rounded-base rounded">
              <span className="inline-flex items-center px-3 text-sm text-body bg-neutral-tertiary border rounded-l-lg border-default-medium border-e-0 rounded-s-base">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-body" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="rounded-none rounded-e-base block w-full px-2 py-2 border border-default-medium text-black text-heading text-sm rounded-r-lg focus:ring-brand focus:border-brand placeholder:text-[0.7rem] placeholder:text-body"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button className="bg-green-600/60 block w-full rounded-lg py-2 border-[1px] border-gray-500/50 font-bold text-[0.7rem] mt-2" onClick={() => handleLogin()}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
