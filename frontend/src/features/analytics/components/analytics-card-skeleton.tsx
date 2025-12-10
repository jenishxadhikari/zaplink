import { Skeleton } from '@/components/ui/skeleton'

export function AnalyticsCardSkeleton() {
  return (
    <>
      <Skeleton className="h-[125px] w-auto rounded-xl" />
      <Skeleton className="h-[125px] w-auto rounded-xl" />
      <Skeleton className="h-[125px] w-auto rounded-xl" />
    </>
  )
}
