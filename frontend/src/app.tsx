import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Dashboard } from '@/components/layout/dashboard'
import { Main } from '@/components/layout/main'
import { NotFound } from '@/components/not-found'

import ForgotPassword from '@/pages/auth/forgot-password'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import ResetPassword from '@/pages/auth/reset-password'
import VerifyEmail from '@/pages/auth/verify-email'
import VerifyOTP from '@/pages/auth/verify-otp'
import Home from '@/pages/home'
import Analytics from '@/pages/protected/analytics'
import Links from '@/pages/protected/links'
import Settings from '@/pages/protected/settings'
import ProtectedRoute from '@/routes/protected.route'
import PublicRoute from '@/routes/public.route'
import Redirect from '@/pages/redirect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route element={<ProtectedRoute />} path="dashboard">
            <Route element={<Links />} path="" />
            <Route element={<Analytics />} path="analytics" />
            <Route element={<Settings />} path="settings" />
          </Route>
        </Route>

        <Route element={<Main />}>
          <Route element={<Home />} path="" />

          <Route element={<PublicRoute />}>
            <Route element={<Login />} path="login" />
            <Route element={<Register />} path="register" />
            <Route element={<ForgotPassword />} path="password/forgot" />
            <Route element={<ResetPassword />} path="password/reset" />
            <Route element={<VerifyEmail />} path="email/verify" />
            <Route element={<VerifyOTP />} path="2fa/verify" />
          </Route>

          <Route element={<Redirect />} path="/:shortUrlKey" />

          <Route element={<NotFound />} path='*' />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
