import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base'
import { MaximizeIcon, MinimizeIcon } from 'lucide-react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { FaVolumeHigh } from 'react-icons/fa6'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import { cn } from '~/lib/utils'
import { detectDeviceType, formatTime } from '~/utils'
import { Button } from '~/components/ui/button'
import { Progress } from '~/components/ui/progress'

interface VideoPlayerProps {
  videoUrl: string
  className?: string
}

const setVolumeToLocalStorage = (volume: number) => {
  localStorage.setItem('volume-video', volume.toString())
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, className }) => {
  const [volume, setVolume] = useState<number>(() => {
    const volume = localStorage.getItem('volume-video')
    return volume ? Number(localStorage.getItem('volume-video')) : 1
  })
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [durationTime, setDurationTime] = useState<number>(0)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [isShowControls, setIsShowControls] = useState<boolean>(videoUrl ? true : false)

  const handleFullScreen = useFullScreenHandle()

  const IconPlay = isPlaying ? FaPause : FaPlay
  const IconFullScreen = handleFullScreen.active ? MinimizeIcon : MaximizeIcon

  const progressRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)
  const timerMouseVideoRef = useRef<number | null>(null)

  useEffect(() => {
    setVolumeToLocalStorage(volume)
  }, [volume])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f') {
        e.preventDefault()
        handleFullScreen.active ? handleFullScreen.exit() : handleFullScreen.enter()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        handleFullScreen.exit()
      } else if (e.key === ' ') {
        e.preventDefault()
        isPlaying ? setIsPlaying(false) : setIsPlaying(true)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setVolume((prevState) => {
          const newVolume = prevState + 0.1
          if (newVolume >= 1) return 1
          return newVolume
        })
      } else if (e.key === 'ArrowDown') {
        setVolume((prevState) => {
          const newVolume = prevState - 0.1
          if (newVolume <= 0) return 0
          return newVolume
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleFullScreen, isPlaying])

  const handleProgress = (state: OnProgressProps) => {
    const progressValue = (state.playedSeconds / durationTime) * 100
    setCurrentTime(state.playedSeconds)
    setProgressValue(progressValue)
  }

  const handleClickProgress = (e: React.MouseEvent) => {
    const progress = progressRef.current
    const rect = progress?.getBoundingClientRect()
    if (rect) {
      const mouseX = e.clientX - rect?.left
      const newProgress = mouseX / rect?.width
      setProgressValue(newProgress * 100)
      playerRef.current?.seekTo(newProgress * durationTime, 'seconds')
    }
  }

  const handleMouseMoveVideo = () => {
    setIsShowControls(true)

    if (isPlaying) {
      if (timerMouseVideoRef.current) {
        clearTimeout(timerMouseVideoRef.current)
      }

      timerMouseVideoRef.current = setTimeout(() => {
        setIsShowControls(false)
      }, 4000)
    }
  }

  const handleMouseLeaveVideo = () => {
    if (isPlaying) {
      if (timerMouseVideoRef.current) {
        clearTimeout(timerMouseVideoRef.current)
      }

      timerMouseVideoRef.current = setTimeout(() => {
        setIsShowControls(false)
      }, 4000)
    }
  }

  return (
    <FullScreen
      handle={handleFullScreen}
      className={cn('flex items-center justify-center', className)}
    >
      <div className="w-full relative">
        <div
          className={cn('w-full h-full cursor-pointer', {
            'cursor-none': !isShowControls && isPlaying,
            '!h-screen': handleFullScreen.active
          })}
          onClick={() => detectDeviceType() === 'Desktop' && setIsPlaying(!isPlaying)}
          onDoubleClick={handleFullScreen.active ? handleFullScreen.exit : handleFullScreen.enter}
          onMouseMove={handleMouseMoveVideo}
          onMouseLeave={handleMouseLeaveVideo}
        >
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={volume}
            url={videoUrl}
            onProgress={handleProgress}
            onDuration={(duration) => setDurationTime(duration)}
            onError={() => {}}
          />
        </div>
        <div
          className={cn('w-ful h-full hidden', {
            block: isShowControls
          })}
        >
          <Button
            className={cn(
              'w-12 md:w-16 lg:w-24 h-12 md:h-16 lg:h-24 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2b333fb3] border-none rounded-full hover:bg-[#2b333fb3]',
              { hidden: detectDeviceType() === 'Desktop' && isPlaying }
            )}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <IconPlay color="#fff" className="w-5 md:w-6 lg:w-10 h-5 md:h-6 lg:h-10" />
          </Button>
          <div
            className="w-[95%] flex items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-10"
            onMouseMove={() => setIsShowControls(true)}
          >
            <span className="text-white text-[13px]">{formatTime(currentTime)}</span>
            <Progress
              ref={progressRef}
              value={progressValue}
              className={cn('h-1 mx-4 bg-opacity-70 cursor-pointer', {
                '!h-[5px]': handleFullScreen.active
              })}
              onClick={handleClickProgress}
              onMouseMove={() => {}}
            />
            <span className="text-white text-[13px]">{formatTime(durationTime)}</span>
          </div>
          <div
            className="w-[95%] flex items-center justify-between absolute left-1/2 -translate-x-1/2 bottom-0"
            onMouseMove={() => setIsShowControls(true)}
          >
            <div className="flex flex-row items-center gap-x-4">
              <Button
                className="bg-transparent p-0 border-none hover:bg-transparent z-10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <IconPlay className="w-5 h-5" />
              </Button>
              <Button
                className="bg-transparent p-0 border-none hover:bg-transparent z-10"
                onClick={() => {}}
              >
                <FaVolumeHigh className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <Button
                className="bg-transparent p-2 border-none hover:bg-transparent z-10 active:rotate-45 transition-transform duration-300"
                onClick={() => {}}
              >
                <IoMdSettings className="w-5 h-5" />
              </Button>
              <Button
                className="bg-transparent p-2 border-none hover:bg-transparent z-10"
                onClick={handleFullScreen.active ? handleFullScreen.exit : handleFullScreen.enter}
              >
                <IconFullScreen className="w-5 h-5 text-white" strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  )
}

export default VideoPlayer
