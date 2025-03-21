import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { PlayIcon } from 'lucide-react'

import { SearchItemType } from '@/types'
import { BASE_IMAGE_URL } from '@/lib/constants'

interface SearchItemProps {
  data: SearchItemType
}

export const SearchItem = ({ data }: SearchItemProps) => {
  const [imageUrl, setImageUrl] = useState(BASE_IMAGE_URL + data.thumb_url)

  return (
    <Link href={`/movie/${data?.slug}`} className="flex flex-col gap-y-2 cursor-pointer group">
      <div className="relative aspect-video rounded-sm overflow-hidden">
        <Image
          fill
          priority
          sizes="100vw"
          src={imageUrl}
          alt={data?.name}
          className="size-full object-cover"
          onError={() => setImageUrl(BASE_IMAGE_URL + data.poster_url)}
        />
        <div className="absolute inset-0 bg-gray-900/30 hidden group-hover:block">
          <PlayIcon className="w-8 h-8 fill-current text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <p className="text-white text-sm xs:text-base text-wrap line-clamp-1">{data?.name}</p>
    </Link>
  )
}
