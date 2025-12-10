import { useQuery } from '@tanstack/react-query'

import { sessionQuery } from '@/lib/api'

export function useAuth() {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: sessionQuery,
    staleTime: Infinity
  })

  return query
}
