'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import { scrollTop } from '@/utils'

const ButtonScrollToTop = () => {
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsShow(window.scrollY > 300)
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      onClick={() => scrollTop()}
      className={cn('w-10 h-10 fixed -bottom-1/2 right-8 flex items-center justify-center rounded-md bg-[#6439FF] outline-none transition-all duration-300', isShow && 'bottom-8')}
    >
      <ChevronUp color="#fff" />
    </button>
  )
}

export default ButtonScrollToTop
