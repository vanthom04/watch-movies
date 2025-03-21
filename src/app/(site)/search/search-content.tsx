import { SearchItemType } from '@/types'
import { SearchItem } from './search-item'

interface SearchContentProps {
  data: SearchItemType[]
}

export const SearchContent = ({ data }: SearchContentProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        <h1 className="text-white text-xl font-light">
          Không tìm thấy kết quả nào trùng khớp
        </h1>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
        {data.map((item) => (
          <SearchItem key={item?._id} data={item} />
        ))}
      </div>
    </div>
  )
}
