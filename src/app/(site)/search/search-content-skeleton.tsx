import { Skeleton } from '@/components/ui/skeleton'

export const SearchContentSkeleton = () => {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 gap-4 lg:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="aspect-video rounded-sm" />
      ))}
    </div>
  )
}
