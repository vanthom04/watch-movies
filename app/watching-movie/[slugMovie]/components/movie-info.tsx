import { useState } from 'react'
import { Movie } from '@/types'
import { cn } from '@/lib/utils'
import ButtonLike from '@/components/button-like'
import ButtonShareMovie from '@/components/button-share-movie'

interface MovieInfoProps {
  movie: Movie
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex flex-col lg:flex-row text-white mt-4">
      <div className="basis-2/3 lg:pr-10">
        <h1 className="text-2xl text-wrap">{movie?.name}</h1>
        <p className="text-base text-wrap font-light">{movie?.origin_name}</p>
        <div className="mt-2 flex flex-row items-center font-light">
          <span>{movie?.year}</span>
          <div className="inline-flex w-[3px] h-[3px] bg-gray-300 rounded-full mx-2" />
          <span>{movie?.episode_current}</span>
          <div className="inline-flex w-[3px] h-[3px] bg-gray-300 rounded-full mx-2" />
          <span>{movie?.quality}</span>
          <div className="inline-flex w-[3px] h-[3px] bg-gray-300 rounded-full mx-2" />
          <span>{movie?.lang}</span>
        </div>
        <div className="mt-2 font-light text-[15px]">
          <p className={cn('transition-all', !isExpanded && 'line-clamp-3')}>
            Mô tả: {movie?.content.replace(/<\/?p>/g, '')}
          </p>
          <button onClick={toggleExpand} className="text-blue-500 font-normal">
            {isExpanded ? 'Thu gọn' : 'Xem thêm'}
          </button>
        </div>
      </div>
      <div className="basis-1/3 mt-4 lg:mt-0 lg:pl-10">
        <div className="flex flex-row space-x-6">
          <ButtonLike className="bg-transparent p-0" movie={movie} />
          <ButtonShareMovie className="bg-transparent p-0" movie={movie} />
        </div>
        <div className="mt-4 space-y-1.5 font-light text-[15px]">
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Đạo diễn:</div>
            {movie?.director.map((director, index) => {
              if (!director) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie?.director.length - 1 ? director : director + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Diễn viên:</div>
            {movie?.actor.map((actor, index) => {
              if (!actor) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie?.actor.length - 1 ? actor : actor + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Thể loại:</div>
            {movie?.category.map((category, index) => {
              if (!category.name) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie?.category.length - 1 ? category.name : category.name + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Quốc gia:</div>
            {movie?.country.map((country, index) => {
              if (!country.name) {
                return <span key={index}>Chưa biết</span>
              }

              return (
                <span key={index} className="mr-2">
                  {index === movie?.country.length - 1 ? country.name : country.name + ','}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
