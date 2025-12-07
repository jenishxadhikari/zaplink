import { Loader } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '@/context/auth-provider'
import { socket } from '@/hooks/use-socket'
import { useEffect } from 'react'

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, session } = useAuthContext()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !session) return

    socket.auth = { userId: session.user.id }
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [isLoading, isAuthenticated, session?.user.id])
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[rgba(255,255,255,.2)] text-2xl backdrop-blur-sm">
        <Loader size="30px" className="animate-spin" />
        Loading...
      </div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
