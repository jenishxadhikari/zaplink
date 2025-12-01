import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { ZapItForm } from '@/features/home/components/zap-it-form'

export default function Home() {
  return (
    <div className="space-y-6 py-10 md:py-12">
      <section>
        <MaxWidthWrapper className="flex flex-col items-center justify-center gap-2 md:gap-3">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
            Shorten. Share. Track.
          </h1>
          <p className="text-muted-foreground max-w-xl text-center text-xs tracking-wide text-pretty md:text-lg">
            Zaplink makes sharing easier with fast, reliable, and trackable short URLs. Track
            performance, manage campaigns, and share smarter with Zaplink.
          </p>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <ZapItForm />
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
