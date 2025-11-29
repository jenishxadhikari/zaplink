import { MaxWidthWrapper } from '@/components/max-width-wrapper'
import { ZapItForm } from '@/features/home/components/zap-it-form'

export default function Home() {
  return (
    <div className='py-10 md:py-12 space-y-6'>
      <section>
        <MaxWidthWrapper className='flex flex-col items-center justify-center gap-2 md:gap-3'>
          <h1 className='text-4xl md:text-6xl font-bold text-center tracking-tight'>Shorten. Share. Track.</h1>
          <p className='tracking-wide text-center text-pretty max-w-xl text-xs md:text-lg text-muted-foreground'>
            Zaplink makes sharing easier with fast, reliable, and trackable short URLs.
            Track performance, manage campaigns, and share smarter with Zaplink.
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
