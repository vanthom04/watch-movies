'use client'

import { useState, useRef, useEffect } from 'react'
import { LoaderCircleIcon, SearchIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import useDebounce from '@/hooks/use-debounce'
import { Input } from '@/components/ui/input'
import SearchContent from './components/search-content'
import getMoviesByKeyword from '@/actions/getMoviesByKeyword'

const Search = () => {
  const [data, setData] = useState<any>(null)
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const debounceValue = useDebounce(value, 600)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (debounceValue.trim()) {
      setIsLoading(true)
      getMoviesByKeyword(debounceValue)
        .then((data) => setData(data))
        .finally(() => setIsLoading(false))
    }
  }, [debounceValue])

  return (
    <div className="flex flex-col gap-y-6 animate-fade-in">
      <div className="relative px-2 sm:px-3 py-2 sm:py-4 bg-[#151515] rounded-lg">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
        <Input
          autoFocus
          ref={inputRef}
          type="text"
          name="search"
          value={value}
          spellCheck="false"
          autoComplete="off"
          placeholder="Nhập tên phim..."
          className="px-10 bg-transparent text-white text-base border-none placeholder:text-[#818181]"
          onChange={(e) => setValue(e.target.value)}
        />
        <XIcon
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] cursor-pointer hidden',
            {
              '!hidden': isLoading,
              block: !!value
            }
          )}
          onClick={() => {
            setValue('')
            inputRef.current?.focus()
          }}
        />
        <LoaderCircleIcon
          className={cn('absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] hidden', {
            'block animate-spinner': isLoading
          })}
        />
      </div>
      {!!value && !isLoading && data && <SearchContent data={data?.data?.items} />}
    </div>
  )
}

export default Search
