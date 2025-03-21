import { Skeleton } from '@/components/ui/skeleton'

export const MovieSkeleton = () => {
  return (
    <div className="px-4 py-2 animate-fade-in">
      <div className="w-full flex gap-x-4">
        <div className="basis-2/3">
          <Skeleton className="aspect-video rounded-md" />
        </div>
        <div className="basis-1/3 space-y-2">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <div className="flex items-center gap-x-2">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-y-2">
        <Skeleton className="w-[480px] h-8" />
        <Skeleton className="w-[80%] h-6" />
        <Skeleton className="w-[80%] h-6" />
        <Skeleton className="w-[80%] h-6" />
      </div>
    </div>
  )
}
