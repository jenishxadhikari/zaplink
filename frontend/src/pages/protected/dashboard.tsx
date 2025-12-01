import { useAuthContext } from '@/context/auth-provider'

import { Logout } from '@/features/auth/components/logout-button'

export default function Dashboard() {
  const { session } = useAuthContext()
  return (
    <section className="space-y-4 py-4 md:py-8">
      <h1>Dashboard</h1>
      <Logout />
      <p className="max-w-md">{JSON.stringify(session)}</p>
    </section>
  )
}
