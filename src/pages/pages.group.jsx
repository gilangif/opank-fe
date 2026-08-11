import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useGroupStore } from "../store/group.store.js"
import { DEFAULT_IMAGE_THUMBS } from "../config.js"

import GroupCard from "../components/group/group.card.jsx"
import GroupDialogDetail from "../components/group/group.dialog.detail.jsx"
import getPagination from "../utils/getPagination.js"

export default function Group() {
  const { accounts, lists, listData, getLists, getAccounts } = useGroupStore((state) => state)

  const [searchParams, setSearchParams] = useSearchParams()

  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState({})

  const [page, setPage] = useState(() => searchParams.get("page"))
  const [limit, setLimit] = useState(() => searchParams.get("limit"))
  const [search, setSearch] = useState(() => searchParams.get("search"))

  const [filter, setFilter] = useState(() => ({
    min_member: searchParams.get("min_member"),
    max_member: searchParams.get("max_member"),
    mark: searchParams.get("mark"),
  }))

  const [group, setGroup] = useState(() => ({
    bot: searchParams.get("bot"),
    user: searchParams.get("user"),
    group: searchParams.get("group"),
  }))

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
    const limit = parseInt(searchParams.get("limit") || "20")

    const search = searchParams.get("search") ? searchParams.get("search") : ""

    if (page) params.page = page
    if (limit) params.limit = limit
    if (search) params.search = search

    for (const key in filter) {
      const element = filter[key]

      if (element !== null && element !== undefined && element !== "") params[key] = element
    }

    for (const key in group) {
      const element = group[key]

      if (element !== null && element !== undefined && element !== "") params[key] = element
    }

    getLists(params)

    document.title = "OPANK GROUP DATA"
  }, [searchParams, filter, group])

  return (
    <>
      <button onClick={() => setOpen(true)}>asd</button>

      <GroupDialogDetail open={open} setOpen={setOpen} detail={detail} />

      <form onSubmit={(e) => handleSearch(e)}>
        <div className="flex flex-col max-w-md mx-auto">
          <div className="flex items-center mx-auto w-md gap-2 px-2 py-2 mb-3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Icon description</span>
            </button>
          </div>

          <div className="flex flex-row gap-4 max-w-md mx-auto mb-5 px-2">
            <div className="flex flex-col gap-3">
              <p className="text-sm">Member</p>

              <input
                type="number"
                aria-describedby="helper-text-explanation"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Minimum member"
                value={filter.min_member}
                onChange={(e) => setFilter((last) => ({ ...last, min_member: e.target.value }))}
              />

              <input
                type="number"
                aria-describedby="helper-text-explanation"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Maximum member"
                value={filter.max_member}
                onChange={(e) => setFilter((last) => ({ ...last, max_member: e.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm">Filter</p>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={filter.mark === undefined || filter.mark === null} className="sr-only peer" onChange={(e) => setFilter({ mark: null })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">All</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={filter.mark === 1} className="sr-only peer" onChange={(e) => setFilter({ mark: 1 })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">Marked</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={filter.mark === 0} className="sr-only peer" onChange={(e) => setFilter({ mark: 0 })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">Unmarked</span>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm">Categories</p>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={Object.values(group).filter((value) => value).length === 0} onChange={(e) => setGroup({})} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">All</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={group.group === 1} onChange={(e) => setGroup({ group: 1 })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">Channel</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={group.user === 1} onChange={(e) => setGroup({ user: 1 })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">User</span>
              </label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={group.bot === 1} onChange={(e) => setGroup({ bot: 1 })} />
                <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
                <span className="ms-3 text-sm font-medium text-white select-none">Bot</span>
              </label>
            </div>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  gap-2 px-3">
        {lists.map((list) => {
          const { id, is_mark, invites, data } = list
          const { thumb, link, code, title, description, member, preview, dana, bot, user, group, chats } = data || {}

          return <GroupCard key={id} data={{ id, is_mark, invites, thumb, link, code, title, description, member, preview, dana, bot, user, group, chats }} setDetail={setDetail} setOpen={setOpen} />
        })}
      </div>

      <nav className="my-5 w-100vw flex justify-center">
        <ul className="flex -space-x-px text-sm">
          <li>
            <button
              className="flex items-center justify-center text-white bg-green-900/40 box-border hover:bg-green-900 font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-900/40"
              disabled={!listData.prev_page}
              onClick={(e) => handleNavigation(e, listData.prev_page)}
            >
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
              </svg>
            </button>
          </li>

          {pages.map((page, i) => {
            return (
              <li key={i}>
                <button
                  onClick={(e) => handleNavigation(e, page)}
                  className={`flex items-center justify-center ${page === listData.page ? "bg-white/90 text-yellow-900 font-bold" : "bg-green-900/40 text-white"}  box-border hover:bg-green-900 hover:text-white font-medium text-sm w-9 h-9 focus:outline-none`}
                >
                  {page}
                </button>
              </li>
            )
          })}

          <li>
            <button
              className="flex items-center justify-center text-white bg-green-900/40 box-border hover:bg-green-900 font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-900/40"
              disabled={!listData.next_page}
              onClick={(e) => handleNavigation(e, listData.next_page)}
            >
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
