import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getLinksQuery } from '@/lib/api'

import { EmptyLinkBox } from './empty-link-box'
import { LinkCard } from './link-card'

export function LinkCardSection() {
  const [searchParams] = useSearchParams()
  let page = searchParams.get('page') ?? 1
  page = Number(page)

  const { data } = useSuspenseQuery({
    queryKey: ['links', page],
    queryFn: () => getLinksQuery(page),
    staleTime: Infinity
  })

  const links = data.data

  // const totalPages = data.meta.totalPages

  return (
    <div className="flex h-full flex-col py-2">
      {links.length === 0 ? (
        <EmptyLinkBox />
      ) : (
        <div className="flex-1">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
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
      )}
    </div>
  )
}
