import Link from 'next/link'
import { format } from 'date-fns'
import { FaPlay } from 'react-icons/fa'

import { MovieApi } from '@/types'
import getMovieDetails from '@/actions/getMovieDetails'
import ButtonLike from '@/components/button-like'
import ButtonShareMovie from '@/components/button-share-movie'
import ImagePoster from './components/image-poster'

interface IParams {
  slugMovie: string
}

const MovieDetails = async ({ params }: { params: IParams }) => {
  const movieDetails: MovieApi = await getMovieDetails(params.slugMovie)

  return (
    <div className="animate-fade-in">
      <div className="w-full flex flex-row">
        <div className="basis-2/3 md:pr-4">
          <ImagePoster
            width={1920}
            height={1080}
            className="w-full h-full rounded-md object-cover"
            src={movieDetails?.movie.poster_url}
            alt={movieDetails?.movie.name}
          />
        </div>
        <div className="basis-1/3 text-white space-y-1.5">
          <h1 className="text-2xl text-wrap font-semibold">{movieDetails?.movie.name}</h1>
          <div className="flex flex-row">
            <div className="mr-2">Ngày cập nhật:</div>
            <div>{format(movieDetails.movie.modified.time, 'dd/MM/yyyy')}</div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Đạo diễn:</div>
            {movieDetails.movie.director.map((director, index) => {
              if (!director) {
                return <span key={index}>Chưa biết</span>
              }
  
              return (
                <span key={index} className="mr-2">
                  {index === movieDetails.movie.director.length - 1 ? director : director + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Diễn viên:</div>
            {movieDetails.movie.actor.map((actor, index) => {
              if (!actor) {
                return <span key={index}>Chưa biết</span>
              }
  
              return (
                <span key={index} className="mr-2">
                  {index === movieDetails.movie.actor.length - 1 ? actor : actor + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Thời lượng:</div>
            <div>{movieDetails.movie.time}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Trạng thái:</div>
            <div>{movieDetails.movie.episode_current}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Tổng số tập:</div>
            <div>{movieDetails.movie.episode_total}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Chất lượng:</div>
            <div>{movieDetails.movie.quality}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Ngôn ngữ:</div>
            <div>{movieDetails.movie.lang}</div>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Năm sản xuất:</div>
            <div>{movieDetails.movie.year}</div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Quốc gia:</div>
            {movieDetails.movie.country.map((country, index) => {
              if (!country.name) {
                return <span key={index}>Chưa biết</span>
              }
  
              return (
                <span key={index} className="mr-2">
                  {index === movieDetails.movie.country.length - 1
                    ? country.name
                    : country.name + ','}
                </span>
              )
            })}
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mr-2">Thể loại:</div>
            {movieDetails.movie.category.map((category, index) => {
              if (!category.name) {
                return <span key={index}>Chưa biết</span>
              }
  
              return (
                <span key={index} className="mr-2">
                  {index === movieDetails.movie.category.length - 1
                    ? category.name
                    : category.name + ','}
                </span>
              )
            })}
          </div>
  
          {/* button click watch movie */}
          <div className="flex flex-row items-center gap-x-3 !mt-4">
            <Link
              href={`/watching-movie/${params.slugMovie}`}
              className="max-w-max flex flex-row items-center justify-center py-2.5 px-3.5 rounded-md bg-[#AD49E1] transition-transform duration-300 active:scale-95"
            >
              <FaPlay className="w-4 h-4 text-white" />
              <span className="ml-2">Xem phim</span>
            </Link>
            <ButtonShareMovie movie={movieDetails.movie} />
            <ButtonLike movie={movieDetails.movie} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-white mt-10">
        <h2 className="text-2xl text-center">{movieDetails.movie.name}</h2>
        <p className="font-light text-center mt-2">
          {movieDetails.movie.content.replace(/<\/?p>/g, '')}
        </p>
      </div>
    </div>
  )
}

export default MovieDetails
