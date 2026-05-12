export default function CardRecommend() {
  return (
    <div className="flex flex-col justify-center items-center snap-start shrink-0 w-[110px] md:w-[200px] gap-1">
      <img
        src="https://dthezntil550i.cloudfront.net/qe/latest/qe2001070444226870012184583/1280_960/f0c37cde-9689-4234-a284-a239110170cf.png"
        alt=""
        className="w-full h-full aspect-square rounded-lg hover:border-2 hover:border-yellow-500/50"
      />
      <div className="w-full">
        <p className="text-[0.7rem] font-bold truncate hover:text-yellow-500">O P A N K</p>
        <p className="text-[0.6rem] hover:text-yellow-300">1731 subsribers</p>
      </div>
    </div>
  )
}
