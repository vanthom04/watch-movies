import { useEffect, useState } from 'react'
import { Episode } from '@/types'
import { cn } from '@/lib/utils'

type ListEpisode = {
  title: string
  episodes: Episode[]
}

interface MovieEpisodesProps {
  serverName: string
  episodes: Episode[]
  currentEpisode: Episode
  onClick: (episode: Episode) => void
}

const MovieEpisodes: React.FC<MovieEpisodesProps> = ({
  currentEpisode,
  serverName,
  episodes,
  onClick
}) => {
  const [listEpisode, setListEpisode] = useState<ListEpisode[]>([])
  const [activeEpisode, setActiveEpisode] = useState<Episode[]>([])

  useEffect(() => {
    const splitEpisodeIntoChunks = (list: Episode[], chunkSize: number) => {
      const chunkedEpisode: ListEpisode[] = []
      for (let i = 0; i < list.length; i += chunkSize) {
        const episodes = list.slice(i, i + chunkSize)
        chunkedEpisode.push({
          title: `${i + 1} - ${i + episodes.length}`,
          episodes
        })
      }
      return chunkedEpisode
    }

    const chunkedEpisodes = splitEpisodeIntoChunks(episodes, 50)
    setListEpisode(chunkedEpisodes)
    setActiveEpisode(chunkedEpisodes[0].episodes)
  }, [episodes])

  return (
    <div className="w-full">
      <h2>{serverName}</h2>
      {episodes.length > 50 && (
        <div className="mt-2 space-x-4 overflow-y-hidden">
          {listEpisode.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActiveEpisode(listEpisode[index].episodes)}
              className="text-sm py-2 px-6 bg-neutral-600/80 rounded-lg"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-row flex-wrap gap-4 mt-2">
        {episodes.length > 50 ? (
          activeEpisode.map((episode) => (
            <button
              key={episode.name}
              onClick={() => onClick(episode)}
              className={cn('py-2 px-4 bg-neutral-700 rounded-md cursor-pointer', {
                'bg-[#ff5833]': currentEpisode.slug === episode.slug
              })}
            >
              Tập {episode.name}
            </button>
          ))
        ) : (
          episodes.map((episode) => (
            <button
              key={episode.name}
              onClick={() => onClick(episode)}
              className={cn('py-2 px-4 bg-neutral-700 rounded-md cursor-pointer', {
                'bg-[#ff5833]': currentEpisode.slug === episode.slug
              })}
            >
              Tập {episode.name}
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default MovieEpisodes
