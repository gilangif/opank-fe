export default function CardSession({ name, alias, role, room, balance, setOpen }) {
  const handleUserSheet = () => {
    console.log(Date.now())
    setOpen(true)
  }

  return (
    <div className="flex flex-row h-[76px] p-1 gap-2 hover:bg-gray-100/20 transition duration-700 ease-in-out rounded-lg">
      <div className="flex justify-center items-center rounded-lg aspect-square">
        <img
          src="https://dthezntil550i.cloudfront.net/qe/latest/qe2001070444226870012184583/1280_960/f0c37cde-9689-4234-a284-a239110170cf.png"
          alt=""
          srcSet=""
          className="w-full h-full object-cover rounded-lg border-[1px] border-gray-500 hover:border-yellow-500/80"
        />
      </div>

      <div className="flex flex-col w-full px-1 justify-around">
        <div>
          <p className="text-[0.68rem] font-bold hover:text-yellow-500">{name}</p>
          <p className="text-[10px] font-semibold hover:text-yellow-300">{alias}</p>
        </div>
        <div>
          <p className="text-[10px] hover:text-yellow-300">
            {role} {room}
          </p>
          <p className="text-[10px] hover:text-yellow-300">RP {balance}</p>
        </div>
      </div>

      <div className="flex justify-center items-center px-2">
        <div onClick={() => handleUserSheet()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-yellow-500 transition duration-500">
            <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}
