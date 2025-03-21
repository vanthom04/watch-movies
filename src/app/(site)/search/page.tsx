'use client'

import { useQueryState } from 'nuqs'
import { useState, useRef, useEffect, Suspense } from 'react'
import { LoaderCircleIcon, SearchIcon, XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { SearchApi } from '@/types'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { getMoviesByKeyword } from '@/actions/get-movies-by-keyword'

import { SearchContent } from './search-content'
import { SearchContentSkeleton } from './search-content-skeleton'

const SearchComponent = () => {
  const [keyword, setKeyword] = useQueryState('keyword')
  const [data, setData] = useState<SearchApi | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState(keyword ?? '')

  const debounceValue = useDebounce(value, 600)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (debounceValue.trim()) {
      setIsLoading(true)
      setKeyword(debounceValue)
      getMoviesByKeyword(debounceValue)
        .then((data) => setData(data))
        .finally(() => setIsLoading(false))
    } else {
      setKeyword(null)
      setData(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          value={value || ''}
          spellCheck="false"
          autoComplete="off"
          placeholder="Nhập tên phim..."
          className="px-10 bg-transparent text-white text-base border-none placeholder:text-[#818181] selection:bg-blue-500/50"
          onChange={(e) => setValue(e.target.value)}
        />
        <XCircleIcon
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] cursor-pointer hidden',
            isLoading && '!hidden',
            !!value && 'block'
          )}
          onClick={() => {
            setValue('')
            inputRef.current?.focus()
          }}
        />
        <LoaderCircleIcon
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] hidden',
            isLoading && 'block animate-spin'
          )}
        />
      </div>
      {!!value && !isLoading && data && <SearchContent data={data?.data?.items} />}
      {!!value && isLoading && <SearchContentSkeleton />}
    </div>
  )
}

const Search = () => {
  return (
    <Suspense fallback={<SearchContentSkeleton />}>
      <SearchComponent />
    </Suspense>
  )
}

export default Search
