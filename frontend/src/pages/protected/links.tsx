import { Header } from '@/components/header'

import { CreateLinkDialog } from '@/features/links/components/create-link-dialog'
import { LinkCardSection } from '@/features/links/components/link-card-section'

export default function Links() {
  return (
    <div className="flex-1 flex flex-col space-y-6 p-4">
      <div className="flex items-center justify-between gap-1">
        <Header 
          title='Links'
          description='Manage and track all your shortened links'
        />
        <CreateLinkDialog />
      </div>

      <LinkCardSection />
    </div>
  )
}
