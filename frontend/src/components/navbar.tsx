import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MaxWidthWrapper } from './max-width-wrapper'
import { buttonVariants } from './ui/button'

export function Navbar() {
  const isAuthenticated = false
  return (
    <nav className="h-15 border-b">
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link
          to="/"
          className={buttonVariants({
            size: 'sm',
            variant: 'outline',
            className: 'font-mono font-semibold tracking-tight'
          })}
        >
          Zaplink
        </Link>
        {isAuthenticated ? (
          <Link
            to="/"
            className={buttonVariants({
              size: 'sm',
              className: 'group gap-x-1'
            })}
          >
            Dashboard
            <ArrowRight className="transition-all duration-300 group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <Link
            to="/"
            className={buttonVariants({
              size: 'sm'
            })}
          >
            Login
          </Link>
        )}
      </MaxWidthWrapper>
    </nav>
  )
}
