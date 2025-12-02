import { Outlet } from 'react-router-dom'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/sidebar/app-sidebar'

export function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col p-3">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
