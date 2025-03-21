'use client'

import { LoaderIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { scrollToTop } from '@/lib/utils'
import { getMovie } from '@/actions/get-movie'
import { Episode, Movie, ServerData } from '@/types'

import { MovieInfo } from './movie-info'
import { VideoPlayer } from './video-player'
import { MovieEpisodes } from './movie-episodes'

const Watch = () => {
  const { slugMovie } = useParams<{ slugMovie: string }>()

  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [episodes, setEpisodes] = useState<Episode[] | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<ServerData | null>(null)

  useEffect(() => {
    getMovie(slugMovie)
      .then(({ movie, episodes }) => {
        setMovie(movie)
        setEpisodes(episodes)
        setCurrentEpisode(episodes[0].server_data[0])
      })
      .finally(() => setIsLoading(false))
  }, [slugMovie])

  const handleClickEpisode = (episode: ServerData) => {
    setCurrentEpisode(episode)
    scrollToTop()
  }

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
        <LoaderIcon className="size-8 text-muted-foreground animate-spin" />
      </div>
    )
  }

  if (!movie || !episodes) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
        <p className="text-white">Không tìm thấy phim</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-2 flex-1">
      <VideoPlayer
        videoUrl={currentEpisode?.link_m3u8 as string}
        poster={movie.thumb_url as string}
      />

      {/* movie info */}
      <MovieInfo movie={movie} />

      {/* Episodes movie */}
      <div className="mt-6 text-white">
        <h1 className="text-2xl font-semibold">Danh sách tập</h1>
        <div className="flex flex-col gap-4">
          {(episodes || []).map((server, index) => (
            <MovieEpisodes
              key={index}
              currentEpisode={currentEpisode as ServerData}
              serverName={server.server_name}
              episodes={server.server_data}
              onClick={handleClickEpisode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Watch
