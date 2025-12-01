import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Main } from '@/components/layout/main'

import ForgotPassword from '@/pages/auth/forgot-password'
import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import ResetPassword from '@/pages/auth/reset-password'
import VerifyEmail from '@/pages/auth/verify-email'
import VerifyOTP from '@/pages/auth/verify-otp'
import Home from '@/pages/home'
import Dashboard from '@/pages/protected/dashboard'
import ProtectedRoute from '@/routes/protected.route'
import PublicRoute from '@/routes/public.route'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Dashboard />} path="dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
