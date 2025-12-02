import { LucideLink } from 'lucide-react'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'

import { CreateLinkDialog } from '@/features/dashboard/components/create-link-dialog'

export function EmptyLinkBox() {
  return (
    <section>
      <Empty className="border-foreground border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LucideLink />
          </EmptyMedia>
          <EmptyTitle>No Links Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any links yet. Get started by creating your first link.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <CreateLinkDialog />
        </EmptyContent>
      </Empty>
    </section>
  )
}
