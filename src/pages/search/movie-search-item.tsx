import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { cn } from '~/lib/utils'
import { BASE_IMAGE_URL, detectDeviceType } from '~/utils'
import { useRouter } from '~/hooks'
import { SearchItem } from '~/types'

interface MovieSearchItemProps {
  data: SearchItem
}

const MovieSearchItem: React.FC<MovieSearchItemProps> = ({ data }) => {
  const [imageUrl, setImageUrl] = useState<string>(BASE_IMAGE_URL + data?.thumb_url)
  const [isShow, setIsShow] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-2 cursor-pointer">
      <div
        className="relative rounded-sm overflow-hidden"
        onMouseMove={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        onClick={() => router.push(`/xem-phim/${data.slug}`)}
      >
        <LazyLoadImage
          className="w-full h-48 xs:h-40 sm:h-28 lg:h-32 xl:h-40 object-cover"
          src={imageUrl}
          alt={data?.name}
          loading="lazy"
          onError={() => setImageUrl(BASE_IMAGE_URL + data?.poster_url)}
        />
        <div
          className={cn('absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-35 hidden', {
            block: isShow && detectDeviceType() === 'Desktop'
          })}
        >
          <FaPlay className="w-6 h-6 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <h3 className="text-white text-sm xs:text-base text-wrap">{data?.name}</h3>
    </div>
  )
}

export default MovieSearchItem
