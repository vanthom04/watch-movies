'use client'

import Image from 'next/image'
import { ImageProps } from 'next/image'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type ImagePosterProps = ImageProps & {
  className?: string
}

const ImagePoster: React.FC<ImagePosterProps> = ({ className, src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="w-full relative">
      {!loaded && (
        <Skeleton className="absolute inset-0" />
      )}
      <Image
        {...props}
        priority
        width={1920}
        height={1080}
        src={src}
        alt={alt}
        className={cn('object-cover invisible', loaded && 'visible', className)}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

export default ImagePoster
