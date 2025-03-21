import Hls from 'hls.js'
import ArtPlayer from 'artplayer'
import { useEffect, useRef } from 'react'

interface VideoPlayerProps {
  videoUrl: string
  poster: string
}

export const VideoPlayer = ({ videoUrl, poster }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!playerRef.current) return

    const art = new ArtPlayer({
      container: playerRef.current,
      url: videoUrl,
      poster,
      volume: 1,
      autoplay: false,
      autoSize: true,
      loop: false,
      mutex: true,
      setting: true,
      flip: false,
      lock: true,
      fastForward: true,
      playbackRate: true,
      aspectRatio: true,
      theme: '#ff0057',
      pip: true,
      fullscreen: true,
      fullscreenWeb: true,
      miniProgressBar: true,
      autoOrientation: true,
      airplay: false,
      isLive: false,
      muted: false,
      hotkey: true,
      customType: {
        m3u8(video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(url)
            hls.attachMedia(video)
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url
          }
        }
      }
    })

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [videoUrl, poster])

  return (
    <div className="aspect-video bg-neutral-900/80">
      <div ref={playerRef} className="size-full content-center" />
    </div>
  )
}
