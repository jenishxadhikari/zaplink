import { AnalyticsCard } from '@/features/dashboard/components/analytics-cards'
import { AnalyticsChart } from '@/features/dashboard/components/analytics-chart'

export default function Analytics() {
  return (
    <div className="flex-1 space-y-6 p-4">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Analytics of your shortened links</p>
      </header>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <AnalyticsCard />
      </section>
      <section>
        <AnalyticsChart />
      </section>
    </div>
  )
}
