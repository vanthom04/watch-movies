'use client'

import { useState, useEffect } from 'react'

import { scrollTop } from '@/utils'
import { Episode, Movie, MovieApi } from '@/types'
import getMovieDetails from '@/actions/getMovieDetails'
import Spinner from '@/components/spinner'

import MovieInfo from './components/movie-info'
import VideoPlayer from './components/video-player'
import MovieEpisodes from './components/movie-episodes'

interface IParams {
  slugMovie: string
}

const WatchingMovie = ({ params }: { params: IParams }) => {
  const slugMovie: string = params.slugMovie
  const [data, setData] = useState<MovieApi>()
  const [currentEpisode, setCurrentEpisode] = useState<Episode>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    getMovieDetails(slugMovie)
      .then((data) => {
        setData(data)
        setCurrentEpisode(data?.episodes[0].server_data[0])
      })
      .finally(() => setIsLoading(false))
  }, [slugMovie])

  const handleClick = (episode: Episode) => {
    scrollTop()
    setCurrentEpisode(episode)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Spinner size={40} className="mx-auto" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <VideoPlayer
        videoUrl={currentEpisode?.link_m3u8 as string}
        poster={data?.movie.poster_url as string}
      />

      {/* movie info */}
      <MovieInfo movie={data?.movie as Movie} />

      {/* Episodes movie */}
      <div className="mt-6 text-white">
        <h1 className="text-2xl">Danh sách tập</h1>
        {(data?.episodes || []).map((server, index) => (
          <MovieEpisodes
            key={index}
            currentEpisode={currentEpisode as Episode}
            serverName={data?.episodes[0].server_name || ''}
            episodes={data?.episodes[0].server_data || []}
            onClick={(episode) => handleClick(episode)}
          />
        ))}
      </div>
    </div>
  )
}

export default WatchingMovie
