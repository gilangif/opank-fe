export default function CardSession({ name, alias, role, room, balance }) {
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
          <p className="text-[0.7rem] font-bold">{name}</p>
          <p className="text-[10px] font-semibold">{alias}</p>
        </div>
        <div>
          <p className="text-[10px]">
            {role} {room}
          </p>
          <p className="text-[10px]">RP {balance}</p>
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
