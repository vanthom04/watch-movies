import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { SearchItemType } from '@/types'
import { detectDeviceType } from '@/utils'
import { BASE_IMAGE_URL } from '@/utils/constants'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchItemProps {
  data: SearchItemType
}

const SearchItem: React.FC<SearchItemProps> = ({ data }) => {
  const [imageUrl, setImageUrl] = useState<string>(BASE_IMAGE_URL + data?.poster_url)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const router = useRouter()

  return (
    <div className="flex flex-col gap-y-2 cursor-pointer">
      <div
        className="relative rounded-sm overflow-hidden"
        onMouseMove={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        onClick={() => router.push(`/movie-details/${data.slug}`)}
      >
        {!loaded && (
          <Skeleton className="absolute inset-0" />
        )}
        <Image
          priority
          width={1920}
          height={1080}
          src={imageUrl}
          alt={data?.name}
          className="w-full h-48 xs:h-40 sm:h-28 lg:h-32 xl:h-40 object-cover"
          onError={() => setImageUrl(BASE_IMAGE_URL + data?.thumb_url)}
          onLoad={() => setLoaded(true)}
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

export default SearchItem
