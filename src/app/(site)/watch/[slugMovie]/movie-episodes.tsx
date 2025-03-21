import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { ServerData } from '@/types'

type ListEpisode = {
  title: string
  episodes: ServerData[]
}

interface MovieEpisodesProps {
  serverName: string
  episodes: ServerData[]
  currentEpisode: ServerData
  onClick: (episode: ServerData) => void
}

export const MovieEpisodes = ({
  serverName,
  episodes,
  currentEpisode,
  onClick
}: MovieEpisodesProps) => {
  const [listEpisode, setListEpisode] = useState<ListEpisode[]>([])
  const [activeEpisode, setActiveEpisode] = useState<ServerData[]>([])

  useEffect(() => {
    const splitEpisodeIntoChunks = (list: ServerData[], chunkSize: number) => {
      const chunkedEpisode: ListEpisode[] = []
      for (let i = 0; i < list.length; i += chunkSize) {
        chunkedEpisode.push({
          title: `${i + 1} - ${i + chunkSize > list.length ? list.length : i + chunkSize}`,
          episodes: list.slice(i, i + chunkSize)
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
      <h2 className="font-medium italic">{serverName}</h2>
      {episodes.length > 50 && (
        <div className="mt-2 space-x-4 overflow-y-hidden">
          {listEpisode.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActiveEpisode(listEpisode[index].episodes)}
              className={cn(
                'text-sm py-2 px-6 bg-neutral-600/80 rounded-lg cursor-pointer',
                activeEpisode === listEpisode[index].episodes && 'bg-[#ff5833]'
              )}
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
              key={episode.link_m3u8}
              onClick={() => onClick(episode)}
              className={cn('py-2 px-4 bg-neutral-700 rounded-md cursor-pointer', {
                'bg-[#ff5833]': currentEpisode.link_m3u8 === episode.link_m3u8
              })}
            >
              {episode.name}
            </button>
          ))
        ) : (
          episodes.map((episode) => (
            <button
              key={episode.link_m3u8}
              onClick={() => onClick(episode)}
              className={cn('py-2 px-4 bg-neutral-700 rounded-md cursor-pointer', {
                'bg-[#ff5833]': currentEpisode.link_m3u8 === episode.link_m3u8
              })}
            >
              {episode.name}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
