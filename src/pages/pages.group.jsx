import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useGroupStore } from "../store/group.store.js"

import GroupCard from "../components/group/group.card.jsx"
import getPagination from "../utils/getPagination.js"

export default function Group() {
  const { lists, listData, getLists } = useGroupStore((state) => state)

  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(() => searchParams.get("page") || "")
  const [limit, setLimit] = useState(() => searchParams.get("limit") || "")
  const [search, setSearch] = useState(() => searchParams.get("search") || "")

  const [bot, setBot] = useState(0)
  const [user, setUser] = useState(0)
  const [group, setGroup] = useState(1)

  const pages = getPagination(listData.page, listData.total_pages)

  const handleNavigation = (e, page) => {
    e.preventDefault()
    setSearchParams({ ...Object.fromEntries(searchParams), page })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ ...Object.fromEntries(searchParams), search })
  }

  useEffect(() => {
    const params = {}

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search") || ""

    if (page) params.page = page
    if (limit) params.limit = limit
    if (search) params.search = search

    if (bot !== undefined && bot !== null) params.bot = bot
    if (user !== undefined && user !== null) params.user = user
    if (group !== undefined && group !== null) params.group = group

    getLists(params)

    document.title = "OPANK GROUP DATA"
  }, [searchParams])

  return (
    <>
      <div className="p-3">
        <div className="py-3 mb-3">
          <form className="flex items-center max-w-md mx-auto space-x-2" onSubmit={(e) => handleSearch(e)}>
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base ps-9 text-black text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
                placeholder="Search telegram group..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center shrink-0 text-white bg-green-900 hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {lists.map((list) => {
            const { id, is_mark, invites, data } = list
            const { thumb, link, code, title, description, member, preview, dana, bot, user, group, chats } = data

            return (
              <GroupCard
                key={id}
                id={id}
                thumb={thumb}
                link={link || invites[0].link}
                code={code || invites[0].code}
                title={title}
                description={description}
                member={member}
                preview={preview}
                dana={dana}
                bot={bot}
                user={user}
                mark={is_mark}
                group={group}
                invites={invites}
                chats={chats}
              />
            )
          })}
        </div>
      </div>
      <nav className="my-5 w-100vw flex justify-center">
        <ul class="flex -space-x-px text-sm">
          <li>
            <button
              class="flex items-center justify-center text-white bg-yellow-900/40 box-border hover:bg-yellow-900 font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-900/40"
              disabled={!listData.prev_page}
              onClick={(e) => handleNavigation(e, listData.prev_page)}
            >
              <span class="sr-only">Previous</span>
              <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
              </svg>
            </button>
          </li>

          {pages.map((page, i) => {
            return (
              <li key={i}>
                <button
                  onClick={(e) => handleNavigation(e, page)}
                  class={`flex items-center justify-center ${page === listData.page ? "bg-white/90 text-yellow-900 font-bold" : "bg-yellow-900/40 text-white"}  box-border hover:bg-yellow-900 hover:text-white font-medium text-sm w-9 h-9 focus:outline-none`}
                >
                  {page}
                </button>
              </li>
            )
          })}

          <li>
            <button
              class="flex items-center justify-center text-white bg-yellow-900/40 box-border hover:bg-yellow-900 font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-900/40"
              disabled={!listData.next_page}
              onClick={(e) => handleNavigation(e, listData.next_page)}
            >
              <span class="sr-only">Next</span>
              <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
