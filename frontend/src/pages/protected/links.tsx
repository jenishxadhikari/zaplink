import { useState } from 'react'

import { Check, Copy, Eye, EyeOff, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

import { env } from '@/config/env'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { CreateLinkDialog } from '@/features/dashboard/components/create-link-dialog'
import { DeleteLinkDialog } from '@/features/dashboard/components/delete-link-dialog'
import { EmptyLinkBox } from '@/features/dashboard/components/empty-link-box'
import { UpdateLinkDialog } from '@/features/dashboard/components/update-link-dialog'

export default function Links() {
  const links = {
    '0': {
      _id: '692e7f07053490203e64489f',
      title: 'Youtube',
      shortUrlKey: 'a3bCxXS0',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T05:54:15.902Z',
      updatedAt: '2025-12-02T05:54:15.902Z',
      __v: 0
    },
    '1': {
      _id: '692e80aeae9ae06dff7803b3',
      shortUrlKey: '1TjmYO8p',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T06:01:18.474Z',
      updatedAt: '2025-12-02T06:01:18.474Z',
      __v: 0
    },
    '2': {
      _id: '692e80b3ae9ae06dff7803b6',
      shortUrlKey: 'a2eNPBMh',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T06:01:23.480Z',
      updatedAt: '2025-12-02T06:01:23.480Z',
      __v: 0
    },
    '3': {
      _id: '692e80b6ae9ae06dff7803b9',
      title: 'Youtube',
      shortUrlKey: '3BiNBFd9',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T06:01:26.260Z',
      updatedAt: '2025-12-02T06:01:26.260Z',
      __v: 0
    },
    '4': {
      _id: '692e80b8ae9ae06dff7803bc',
      title: 'Youtube',
      shortUrlKey: 'yHFPg7cO',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T06:01:28.067Z',
      updatedAt: '2025-12-02T06:01:28.067Z',
      __v: 0
    },
    '5': {
      _id: '692e80bdae9ae06dff7803bf',
      shortUrlKey: 'IC9PO_MO',
      originalUrl: 'https://www.youtube.com',
      isActive: true,
      clicks: 0,
      userId: '692e717b61e0fdba4f17ef6b',
      createdAt: '2025-12-02T06:01:33.790Z',
      updatedAt: '2025-12-02T06:01:33.790Z',
      __v: 0
    }
  }

  type LinkArray = {
    _id: string
    title?: string
    shortUrlKey: string
    originalUrl: string
    isActive: boolean
    clicks: number
    userId: string
    createdAt: string
    updatedAt: string
    __v: number
  }

  const linkArray: LinkArray[] = Object.values(links)

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, linkId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(linkId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex-1 space-y-6 p-4">
      <div className="flex items-center justify-between gap-1">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Links</h1>
          <p className="text-muted-foreground">Manage and track all your shortened links</p>
        </header>
        <CreateLinkDialog />
      </div>

      {linkArray.length === 0 ? (
        <EmptyLinkBox />
      ) : (
        <div className="space-y-6">
          <section className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <div className="border-primary flex max-w-md gap-0.5 rounded-lg border">
              <Input
                className="border-0 focus-visible:ring-0"
                type="search"
                placeholder="Search link here"
              />
              <Button className="rounded-none">Search</Button>
            </div>
            <div>
              <Select>
                <SelectTrigger className="border-primary w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {linkArray.map((link) => (
              <Card
                key={link._id}
                className={`hover:border-primary/40 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                  link.isActive
                    ? 'bg-card/80 border-border'
                    : 'bg-card/60 border-border/50 opacity-75'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1 text-lg">
                        {link.title ?? link.shortUrlKey}
                      </CardTitle>
                    </div>
                    {link.isActive ? (
                      <Badge variant="default" className="whitespace-nowrap">
                        <Eye className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="whitespace-nowrap">
                        <EyeOff className="mr-1 h-3 w-3" />
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">
                    {link.originalUrl}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Short URL Section */}
                  <div className="bg-accent/5 border-border/50 rounded-lg border p-3">
                    <p className="text-muted-foreground mb-1 text-xs font-medium">Short URL</p>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`${env.BASE_URL}/${link.shortUrlKey}`}
                        className="text-primary truncate font-mono text-sm hover:underline"
                      >
                        {env.BASE_URL}/{link.shortUrlKey}
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 shrink-0 p-0"
                        onClick={() =>
                          copyToClipboard(`${env.BASE_URL}/${link.shortUrlKey}`, link._id)
                        }
                      >
                        {copiedId !== link._id ? (
                          <Copy className="text-muted-foreground" />
                        ) : (
                          <Check className="text-green-500" />
                        )}
                      </Button>
                      <UpdateLinkDialog />
                      <DeleteLinkDialog />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="border-border/50 flex items-center justify-between border-t pt-2">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Clicks</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <TrendingUp className="text-chart-1/70 h-4 w-4" />
                        <p className="text-foreground text-2xl font-bold">{link.clicks}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs font-medium">Created</p>
                      <p className="text-foreground/70 mt-1 text-sm">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
