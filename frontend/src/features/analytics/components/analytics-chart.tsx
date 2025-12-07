'use client'

import * as React from 'react'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-mobile'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const description = 'An interactive area chart'

const chartData = [
  { date: '2024-04-01', clicks: 222 },
  { date: '2024-04-02', clicks: 97 },
  { date: '2024-04-03', clicks: 167 },
  { date: '2024-04-04', clicks: 242 },
  { date: '2024-04-05', clicks: 373 },
  { date: '2024-04-06', clicks: 301 },
  { date: '2024-04-07', clicks: 245 },
  { date: '2024-04-08', clicks: 409 },
  { date: '2024-04-09', clicks: 59 },
  { date: '2024-04-10', clicks: 261 },
  { date: '2024-04-11', clicks: 327 },
  { date: '2024-04-12', clicks: 292 },
  { date: '2024-04-13', clicks: 342 },
  { date: '2024-04-14', clicks: 137 },
  { date: '2024-04-15', clicks: 120 },
  { date: '2024-04-16', clicks: 138 },
  { date: '2024-04-17', clicks: 446 },
  { date: '2024-04-18', clicks: 364 },
  { date: '2024-04-19', clicks: 243 },
  { date: '2024-04-20', clicks: 89 },
  { date: '2024-04-21', clicks: 137 },
  { date: '2024-04-22', clicks: 224 },
  { date: '2024-04-23', clicks: 138 },
  { date: '2024-04-24', clicks: 387 },
  { date: '2024-04-25', clicks: 215 },
  { date: '2024-04-26', clicks: 75 },
  { date: '2024-04-27', clicks: 383 },
  { date: '2024-04-28', clicks: 122 },
  { date: '2024-04-29', clicks: 315 },
  { date: '2024-04-30', clicks: 454 },
  { date: '2024-05-01', clicks: 165 },
  { date: '2024-05-02', clicks: 293 },
  { date: '2024-05-03', clicks: 247 },
  { date: '2024-05-04', clicks: 385 },
  { date: '2024-05-05', clicks: 481 },
  { date: '2024-05-06', clicks: 498 },
  { date: '2024-05-07', clicks: 388 },
  { date: '2024-05-08', clicks: 149 },
  { date: '2024-05-09', clicks: 227 },
  { date: '2024-05-10', clicks: 293 },
  { date: '2024-05-11', clicks: 335 },
  { date: '2024-05-12', clicks: 197 },
  { date: '2024-05-13', clicks: 197 },
  { date: '2024-05-14', clicks: 448 },
  { date: '2024-05-15', clicks: 473 },
  { date: '2024-05-16', clicks: 338 },
  { date: '2024-05-17', clicks: 499 },
  { date: '2024-05-18', clicks: 315 },
  { date: '2024-05-19', clicks: 235 },
  { date: '2024-05-20', clicks: 177 },
  { date: '2024-05-21', clicks: 82 },
  { date: '2024-05-22', clicks: 81 },
  { date: '2024-05-23', clicks: 252 },
  { date: '2024-05-24', clicks: 294 },
  { date: '2024-05-25', clicks: 201 },
  { date: '2024-05-26', clicks: 213 },
  { date: '2024-05-27', clicks: 420 },
  { date: '2024-05-28', clicks: 233 },
  { date: '2024-05-29', clicks: 78 },
  { date: '2024-05-30', clicks: 340 },
  { date: '2024-05-31', clicks: 178 },
  { date: '2024-06-01', clicks: 178 },
  { date: '2024-06-02', clicks: 470 },
  { date: '2024-06-03', clicks: 103 },
  { date: '2024-06-04', clicks: 439 },
  { date: '2024-06-05', clicks: 88 },
  { date: '2024-06-06', clicks: 294 },
  { date: '2024-06-07', clicks: 323 },
  { date: '2024-06-08', clicks: 385 },
  { date: '2024-06-09', clicks: 438 },
  { date: '2024-06-10', clicks: 155 },
  { date: '2024-06-11', clicks: 92 },
  { date: '2024-06-12', clicks: 492 },
  { date: '2024-06-13', clicks: 81 },
  { date: '2024-06-14', clicks: 426 },
  { date: '2024-06-15', clicks: 307 },
  { date: '2024-06-16', clicks: 371 },
  { date: '2024-06-17', clicks: 475 },
  { date: '2024-06-18', clicks: 107 },
  { date: '2024-06-19', clicks: 341 },
  { date: '2024-06-20', clicks: 408 },
  { date: '2024-06-21', clicks: 169 },
  { date: '2024-06-22', clicks: 317 },
  { date: '2024-06-23', clicks: 480 },
  { date: '2024-06-24', clicks: 132 },
  { date: '2024-06-25', clicks: 141 },
  { date: '2024-06-26', clicks: 434 },
  { date: '2024-06-27', clicks: 448 },
  { date: '2024-06-28', clicks: 149 },
  { date: '2024-06-29', clicks: 103 },
  { date: '2024-06-30', clicks: 446 }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  clicks: {
    label: 'Clicks',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

export function AnalyticsChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('90d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Clicks</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Total for the last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="clicks"
              type="natural"
              fill="url(#fillClicks)"
              stroke="var(--color-clicks)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
