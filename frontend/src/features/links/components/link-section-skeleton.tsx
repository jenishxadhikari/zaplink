import { Skeleton } from '@/components/ui/skeleton'

export function LinkSectionSkeleton() {
  return (
    <>
      <div className="flex-1">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[285px] w-auto rounded-xl" />
          <Skeleton className="h-[285px] w-auto rounded-xl" />
          <Skeleton className="h-[285px] w-auto rounded-xl" />
          <Skeleton className="h-[285px] w-auto rounded-xl" />
          <Skeleton className="h-[285px] w-auto rounded-xl" />
          <Skeleton className="h-[285px] w-auto rounded-xl" />
        </section>
      </div>
    </>
  )
}
