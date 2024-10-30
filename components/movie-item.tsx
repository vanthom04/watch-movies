import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { detectDeviceType } from '@/utils'
import { BASE_IMAGE_URL } from '@/utils/constants'
import { Skeleton } from '@/components/ui/skeleton'

interface MovieItemProps {
  name: string
  thumbUrl: string
  posterUrl: string
  slug: string
}

const MovieItem: React.FC<MovieItemProps> = ({ name, thumbUrl, posterUrl, slug }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>(BASE_IMAGE_URL + thumbUrl)

  return (
    <Link href={`/movie-details/${slug}`} scroll={true}>
      <div className="w-40 xs:w-44 sm:w-48 md:w-52">
        <div
          className="w-36 h-60 xs:w-44 xs:h-72 sm:w-48 md:w-52 md:h-80 lg:h-[312px] relative flex rounded-lg overflow-hidden cursor-pointer"
          onMouseMove={() => setIsShow(true)}
          onMouseLeave={() => setIsShow(false)}
        >
          {!loaded && (
            <Skeleton className="absolute inset-0" />
          )}
          <Image
            priority
            width={1080}
            height={1920}
            src={imageUrl}
            alt={name}
            className={cn('object-cover invisible', loaded && 'visible')}
            onLoad={() => setLoaded(true)}
            onError={() => setImageUrl(BASE_IMAGE_URL + posterUrl)}
          />
          <div
            className={cn('absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-40 hidden', {
              block: isShow && detectDeviceType() === 'Desktop'
            })}
          >
            <FaPlay className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        <h3 className="text-white text-sm md:text-base mt-2">{name}</h3>
      </div>
    </Link>
  )
}

export default MovieItem
