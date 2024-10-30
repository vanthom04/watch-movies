import { Skeleton } from '@/components/ui/skeleton'

const MyFavorites = () => {
  return (
    <div>
      <h1 className="text-white text-2xl">Danh sách của tôi</h1>
      {/* List movie here */}
      <div>
        <Skeleton className="w-12 h-12" />
      </div>
    </div>
  )
}

export default MyFavorites
