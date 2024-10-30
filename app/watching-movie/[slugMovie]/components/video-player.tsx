import Hls from 'hls.js'
import { useState, useEffect, useRef } from 'react'
import { MdFullscreenExit, MdFullscreen } from 'react-icons/md'
import { FaPause, FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

import { cn } from '@/lib/utils'
import { formatTime } from '@/utils'
import { Slider } from '@/components/ui/slider'
import Spinner from '@/components/spinner'

interface VideoPlayer {
  videoUrl: string
  poster: string
}

const VideoPlayer: React.FC<VideoPlayer> = ({ videoUrl, poster }) => {
  const [volume, setVolume] = useState<number>(1)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [durationTime, setDurationTime] = useState<number>(0)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [isLoadingVideo, setIsLoadingVideo] = useState<boolean>(true)

  const divRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const IconPlay = isPlaying ? FaPause : FaPlay
  const IconFullScreen = isFullscreen ? MdFullscreenExit : MdFullscreen
  const IconVolume = isMuted ? FaVolumeMute : FaVolumeUp

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(videoUrl)
        hls.attachMedia(videoRef.current)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // TODO: handle playing video
          // videoRef.current?.play()
          // setIsPlaying(true)
        })
      }
    }
  }, [videoUrl])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
      setIsMuted(volume === 0)
    }
  }, [volume])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (videoRef.current) {
        if (e.key === ' ') {
          e.preventDefault()
          handlePlayPause()
        } else if (e.key === 'f') {
          e.preventDefault()
          handleFullScreen()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          videoRef.current.currentTime += 10
          setProgressValue(videoRef.current.currentTime)
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault()
          videoRef.current.currentTime -= 10
          setProgressValue(videoRef.current.currentTime)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setVolume((prevVolume) => {
            const newVolume = prevVolume + 0.1
            if (newVolume >= 1) return 1
            return newVolume
          })
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          setVolume((prevVolume) => {
            const newVolume = prevVolume - 0.1
            if (newVolume <= 0) return 0
            return newVolume
          })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isFullscreen])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdateVideo = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedDataVideo = () => {
    if (videoRef.current) {
      setProgressValue(0)
      setDurationTime(videoRef.current.duration)
    }
  }

  const handleFullScreen = () => {
    if (divRef.current) {
      if (!document.fullscreenElement) {
        divRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const handleLoadStartVideo = () => {
    setIsPlaying(false)
    setIsLoadingVideo(true)
  }

  const handleCanPlayVideo = () => {
    setIsLoadingVideo(false)
  }

  const handleValueChange = (numbers: number[]) => {
    const value = numbers[0]
    setProgressValue(value)
  }

  const handleValueCommit = (numbers: number[]) => {
    const value = numbers[0]
    if (videoRef.current) {
      setProgressValue(value)
      videoRef.current.currentTime = value
    }
  }

  const handleChangeVolume = (numbers: number[]) => {
    const value = numbers[0]
    setVolume(value)
  }

  return (
    <div
      ref={divRef}
      className="relative h-auto w-full pb-[50%] bg-black select-none"
      onDoubleClick={handleFullScreen}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        muted={isMuted}
        onClick={handlePlayPause}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={handleCanPlayVideo}
        onLoadStart={handleLoadStartVideo}
        onTimeUpdate={handleTimeUpdateVideo}
        onLoadedMetadata={handleLoadedDataVideo}
        onError={() => setIsError(true)}
        className="w-full h-full aspect-video object-center select-none absolute left-0 top-1/2 -translate-y-1/2"
      />
      <div
        className={cn('absolute inset-0 hidden items-center justify-center', {
          '!flex': isLoadingVideo
        })}
      >
        <Spinner className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" />
      </div>
      <div
        className={cn('absolute top-0 left-0 right-0 bottom-0 bg-neutral-900/50 hidden items-center justify-center', {
          '!flex': isError
        })}
      >
        <h1 className="text-white text-2xl">Hiện không tìm thấy video!</h1>
      </div>
      <div
        onClick={handlePlayPause}
        className={cn('absolute inset-0 bg-neutral-950/10', {
          '!hidden': !isLoadingVideo && isPlaying
        })}
      >
        <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] items-center justify-center flex rounded-full bg-neutral-800/50">
          <IconPlay className="text-3xl text-white opacity-90" />
        </button>
      </div>

      {/* controls */}
      <div className="absolute bottom-2 left-0 right-0 px-6 space-y-2">
        <div className="flex items-center justify-between gap-x-4 z-50">
          <div className="text-sm text-white">{formatTime(currentTime)}</div>
          <Slider
            min={0}
            max={durationTime}
            value={[progressValue]}
            onValueCommit={handleValueCommit}
            onValueChange={handleValueChange}
          />
          <div className="text-sm text-white">{formatTime(durationTime)}</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-x-4 z-50">
            <button onClick={handlePlayPause}>
              <IconPlay className="text-lg text-white" />
            </button>
            <div className="flex flex-row items-center pr-4 group">
              <button onClick={() => setIsMuted(!isMuted)}>
                <IconVolume className="text-xl text-white" />
              </button>
              <div className="hidden animate-fade-in ml-2 group-hover:block">
                <Slider
                  className="w-20"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[volume]}
                  onValueChange={handleChangeVolume}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <button onClick={handleFullScreen}>
              <IconFullScreen className="text-[26px] text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
