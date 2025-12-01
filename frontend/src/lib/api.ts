import type z from 'zod'

import type {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@/features/auth/schema'

import { API } from './axios'

export function registerMutation(data: z.infer<typeof registerSchema>) {
  return API.post('/v1/auth/register', data)
}

export async function loginMutation(data: z.infer<typeof loginSchema>) {
  return await API.post('/v1/auth/login', data)
}

export function sessionQuery() {
  return API.get('/v1/auth/session')
}

export async function logoutMutation() {
  return await API.post('/v1/auth/logout')
}

export function forgotPasswordMutation(data: z.infer<typeof forgotPasswordSchema>) {
  return API.post('/v1/auth/password/forgot', data)
}

type ResetPasswordMutation = {
  data: z.infer<typeof resetPasswordSchema>
  token: string
}

export function resetPasswordMutation(payload: ResetPasswordMutation) {
  return API.post(`/v1/auth/password/reset?token=${payload.token}`, payload.data)
}

export function verifyEmailMutation(token: string) {
  return API.post(`/v1/auth/email/verify?token=${token}`)
}
