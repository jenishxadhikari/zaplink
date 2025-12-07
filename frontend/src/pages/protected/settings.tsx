import { useAuthContext } from '@/context/auth-provider'

import { Header } from '@/components/header'

import { AccountInfoCard } from '@/features/settings/components/account-info-card'
import { TwoFACard } from '@/features/settings/components/two-fa-card'
import { ThemeCard } from '@/features/settings/components/theme-card'

export default function Settings() {
  const { session } = useAuthContext()
  if (!session) {
    return null
  }
  return (
    <div className="flex-1 space-y-6 p-4">
      <Header 
        title='Settings'
        description='Manage your account and prefrences'
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <AccountInfoCard 
          name={session.user.name}
          email={session.user.email}
        />
        <div className="flex flex-col gap-4">
          <TwoFACard />
          <ThemeCard />
        </div>
      </section>
    </div>
  )
}
