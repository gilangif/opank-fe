export default function Header() {
  return (
    <>
      <div className="h-full">
        <nav className="after:pointer-events-none">
          <div className="flex items-center justify-between py-4 px-2">
            <div className="flex justify-center items-center gap-3">
              <div className="flex items-center justify-center ml-1">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-8 rounded-full border-2 bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </div>
              <div className="flex flex-col flex-1 justify-center">
                <h1 className="text-white text-sm font-bold">Hi, Gilang Idul Fitri</h1>
                <p className="text-gray-300 text-[11px]">user role device</p>
              </div>
            </div>

            <div className="flex gap-4 px-1">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white hover:text-yellow-500 size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>

              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-white hover:text-yellow-500 size-6">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
