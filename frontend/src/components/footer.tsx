import { format } from 'date-fns'

import { MaxWidthWrapper } from './max-width-wrapper'

export function Footer() {
  const currentDate = new Date()
  const formattedDate = format(currentDate, 'y')
  return (
    <footer className="py-4">
      <MaxWidthWrapper>
        <p className="text-muted-foreground text-center text-sm">
          &copy; {formattedDate} Jenish Adhikari
        </p>
      </MaxWidthWrapper>
    </footer>
  )
}
