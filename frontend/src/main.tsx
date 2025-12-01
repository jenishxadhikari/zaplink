import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/sonner.tsx'

import './index.css'

import App from './app.tsx'
import { AuthProvider } from '@/context/auth-provider.tsx'
import QueryProvider from '@/context/query-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  </StrictMode>
)
