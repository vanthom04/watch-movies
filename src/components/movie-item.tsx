import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { cn } from '~/lib/utils'
import { useRouter } from '~/hooks'
import { detectDeviceType } from '~/utils'

interface MovieItemProps {
  name: string
  imageUrl: string
  slug: string
}

const MovieItem: React.FC<MovieItemProps> = ({ name, imageUrl, slug }) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="w-40 xs:w-44 sm:w-48 md:w-52" onClick={() => router.push(`/xem-phim/${slug}`)}>
      <div
        className="w-36 h-60 xs:w-44 xs:h-72 sm:w-48 sm:h-72 md:w-52 md:h-80 lg:h-[312px] relative flex rounded-lg overflow-hidden cursor-pointer"
        onMouseMove={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <LazyLoadImage
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={name}
          loading="lazy"
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
  )
}

export default MovieItem
