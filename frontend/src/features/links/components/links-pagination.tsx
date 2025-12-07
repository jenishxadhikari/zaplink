import { useSearchParams } from 'react-router-dom'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface LinksPaginationProps {
  page: number
  totalPages: number
}

export function LinksPagination({ page, totalPages }: LinksPaginationProps) {
  const [, setSearchParams] = useSearchParams()

  const goToPage = (p: number) => {
    const safePage = Math.max(1, Math.min(totalPages, p))
    setSearchParams({ page: String(safePage) })
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page - 1)}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => {
          const currentPage = index + 1
          return (
            <PaginationItem key={currentPage}>
              <PaginationLink onClick={() => goToPage(currentPage)} isActive={page === currentPage}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page + 1)}
            className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
