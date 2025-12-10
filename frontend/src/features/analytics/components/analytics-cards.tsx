import { useSuspenseQuery } from '@tanstack/react-query'

import { getLinksStatsQuery } from '@/lib/api'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AnalyticsCard() {
  const { data } = useSuspenseQuery({
    queryKey: ['stats'],
    queryFn: getLinksStatsQuery
  })

  const stats = data.data

  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Links</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalLinks}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Clicks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalClicks}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Links</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalActiveLinks}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
