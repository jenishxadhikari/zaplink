import { Suspense } from 'react'

import { Header } from '@/components/header'

import { AnalyticsCardSkeleton } from '@/features/analytics/components/analytics-card-skeleton'
import { AnalyticsCard } from '@/features/analytics/components/analytics-cards'
import { AnalyticsChart } from '@/features/analytics/components/analytics-chart'

export default function Analytics() {
  return (
    <div className="flex-1 space-y-6 p-4">
      <Header title="Analytics" description="Analytics of your shortened links" />
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Suspense fallback={<AnalyticsCardSkeleton />}>
          <AnalyticsCard />
        </Suspense>
      </section>
      <section>
        <AnalyticsChart />
      </section>
    </div>
  )
}
