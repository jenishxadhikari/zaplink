import { Suspense } from 'react'

import { Header } from '@/components/header'

import { CreateLinkDialog } from '@/features/links/components/create-link-dialog'
import { LinkCardSection } from '@/features/links/components/link-card-section'
import { LinkSectionSkeleton } from '@/features/links/components/link-section-skeleton'
import { LinksPagination } from '@/features/links/components/links-pagination'

export default function Links() {
  return (
    <div className="flex flex-1 flex-col space-y-6 p-4">
      <div className="flex items-center justify-between gap-1">
        <Header title="Links" description="Manage and track all your shortened links" />
        <CreateLinkDialog />
      </div>

      <Suspense fallback={<LinkSectionSkeleton />}>
        <LinkCardSection />
      </Suspense>
      <LinksPagination />
    </div>
  )
}
