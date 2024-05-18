import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoaderCircleIcon, SearchIcon, XIcon } from 'lucide-react'

import { cn } from '~/lib/utils'
import { useDebounce } from '~/hooks'
import { useQuerySearch } from '~/queries'
import { Input } from '~/components/ui/input'
import SearchContent from './search-content'

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('keyword')
  const debounceValue = useDebounce(searchQuery || '', 600)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { data, isLoading } = useQuerySearch(debounceValue.trim())

  return (
    <div className="flex flex-col gap-y-6 animate-fade-in">
      <div className="relative px-2 sm:px-3 py-2 sm:py-4 bg-[#151515] rounded-lg">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
        <Input
          autoFocus
          ref={inputRef}
          type="text"
          name="search"
          value={searchQuery || ''}
          spellCheck="false"
          autoComplete="off"
          placeholder="Nhập tên phim..."
          className="px-10 bg-transparent text-white text-base border-none placeholder:text-[#818181]"
          onChange={(e) =>
            e.target.value ? setSearchParams({ keyword: e.target.value }) : setSearchParams({})
          }
        />
        <XIcon
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] cursor-pointer hidden',
            {
              '!hidden': isLoading,
              block: !!searchQuery
            }
          )}
          onClick={() => {
            setSearchParams({})
            inputRef.current?.focus()
          }}
        />
        <LoaderCircleIcon
          className={cn('absolute top-1/2 -translate-y-1/2 right-4 text-[#818181] hidden', {
            'block animate-spinner': isLoading
          })}
        />
      </div>
      {data?.data?.items && <SearchContent data={data?.data?.items} />}
    </div>
  )
}

export default SearchPage
