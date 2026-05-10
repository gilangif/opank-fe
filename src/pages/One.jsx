function CardSession() {
  return (
    <div className="flex flex-row h-[76px] p-1 gap-2">
      <div className="flex justify-center items-center rounded-lg aspect-square">
        <img
          src="https://dthezntil550i.cloudfront.net/qe/latest/qe2001070444226870012184583/1280_960/f0c37cde-9689-4234-a284-a239110170cf.png"
          alt=""
          srcSet=""
          className="w-full h-full object-cover rounded-lg border-2 border-gray-500"
        />
      </div>

      <div className="flex flex-col w-full px-1 justify-around">
        <div>
          <p className="text-[0.7rem] font-bold">GILANG IDUL FITRI</p>
          <p className="text-[10px] font-semibold">081295026951</p>
        </div>
        <div>
          <p className="text-[10px]">community gilang</p>
          <p className="text-[10px]">RP.999.000</p>
        </div>
      </div>

      <div className="flex justify-center items-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default function One() {
  return (
    <>
      <div className="px-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <div className="px-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-sm font-bold">30 USERS REGISTERED</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1">
            <CardSession />
            <CardSession />
            <CardSession />
            <CardSession />
            <CardSession />
            <CardSession />
          </div>
        </div>
      </div>
    </>
  )
}
