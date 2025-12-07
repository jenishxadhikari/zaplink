import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getLinksQuery } from '@/lib/api'

import { EmptyLinkBox } from './empty-link-box'
import { LinkCard } from './link-card'
import { LinksPagination } from './links-pagination'

export function LinkCardSection() {
  const [searchParams] = useSearchParams()
  let page = searchParams.get('page') ?? 1
  page = Number(page)

  const { data } = useQuery({
    queryKey: ['links', page],
    queryFn: () => getLinksQuery(page)
  })
  if (!data) {
    return null
  }

  const links = data.data.urls
  const totalPages = data.data.metadata.total_pages

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
  return (
    <div className="flex h-full flex-col py-2">
      {linkArray.length === 0 ? (
        <EmptyLinkBox />
      ) : (
        <>
          <div className="flex-1">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {linkArray.map((link) => (
                <LinkCard
                  id={link._id}
                  title={link.title}
                  shortUrlKey={link.shortUrlKey}
                  originalUrl={link.originalUrl}
                  isActive={link.isActive}
                  clicks={link.clicks}
                  createdAt={link.createdAt}
                  key={link._id}
                />
              ))}
            </section>
          </div>
          <LinksPagination page={page} totalPages={totalPages} />
        </>
      )}
    </div>
  )
}
