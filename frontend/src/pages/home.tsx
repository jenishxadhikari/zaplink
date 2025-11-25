import { MaxWidthWrapper } from '@/components/max-width-wrapper'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <section className='py-4 md:py-8'>
      <MaxWidthWrapper>
        <h1>Zaplink</h1>
        <Button>Hello World</Button>
      </MaxWidthWrapper>
    </section>
  )
}
