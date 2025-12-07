import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { redirectQuery } from '@/lib/api'

import { NotFound } from '@/components/not-found'

export default function Redirect() {
  const { shortUrlKey } = useParams()
  if (!shortUrlKey) {
    return null
  }

  const { data, isSuccess, isError } = useQuery({
    queryFn: () => redirectQuery(shortUrlKey),
    queryKey: ['redirect', shortUrlKey],
    staleTime: Infinity
  })

  if (isSuccess) {
    window.location.replace(data.data.url)
  }

  if (isError) {
    return <NotFound />
  }

  return null
}
