import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { cn } from '~/lib/utils'
import { useQueryMovie } from '~/queries'
import VideoPlayer from './video-player'
import WatchingContent from './watching-content'

const WatchingPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('')

  const params = useParams<{ slugMovie: string }>()
  const { data } = useQueryMovie(params?.slugMovie ?? '')

  useEffect(() => {
    const videoUrl = localStorage.getItem(window.location.pathname)
    if (videoUrl) {
      setVideoUrl(videoUrl)
    } else {
      setVideoUrl(data?.episodes[0].server_data[0].link_m3u8 ?? '')
    }
  }, [data?.episodes])

  const handleSetVideoUrl = (url: string) => {
    if (url === videoUrl) return
    setVideoUrl(url)
    localStorage.setItem(window.location.pathname, url)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="w-full h-full animate-fade-in select-none">
      <div className="flex flex-col lg:flex-row bg-[#111319]">
        <VideoPlayer className="basis-2/3" videoUrl={videoUrl} />
        <div className="basis-1/3 flex flex-col gap-y-2 px-4 py-3">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">Chọn tập</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-3.5 md:gap-6 max-h-96 overflow-y-auto">
            {data?.episodes[0].server_data.map((episode) => (
              <div
                key={episode.filename}
                className={cn(
                  'px-2.5 py-2 bg-[#1a1c22] text-white text-sm md:text-base text-center rounded-sm cursor-pointer',
                  { 'border border-white': videoUrl === episode.link_m3u8 }
                )}
                onClick={() => handleSetVideoUrl(episode.link_m3u8)}
              >
                {episode.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <WatchingContent movie={data?.movie} />
    </div>
  )
}

export default WatchingPage
