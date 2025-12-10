import type z from 'zod'

import type {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '@/features/auth/schema'
import type { createLinkSchema, updateLinkSchema } from '@/features/links/schema'

import { API } from './axios'

/*
  Auth API Endpoints
*/

/*
  Register User
*/
export function registerMutation(data: z.infer<typeof registerSchema>): Promise<{
  message: string
}> {
  return API.post('/api/v1/auth/register', data)
}

/*
  Login User
*/
export async function loginMutation(data: z.infer<typeof loginSchema>): Promise<{
  accessToken: string
  message: string
}> {
  return await API.post('/api/v1/auth/login', data)
}

/*
  Get User Session
*/
export async function sessionQuery(): Promise<{
  data: {
    id: string
    name: string
    email: string
    isVerified: boolean
    is2FAEnabled: boolean
    createdAt: Date
    updatedAt: Date
  }
  message: string
}> {
  return await API.get('/api/v1/auth/session')
}

/*
  Logout User
*/
export async function logoutMutation(): Promise<{
  message: string
}> {
  return await API.post('/api/v1/auth/logout')
}

/*
  Forgot Password - Get Reset Mail
*/
export function forgotPasswordMutation(data: z.infer<typeof forgotPasswordSchema>): Promise<{
  message: string
}> {
  return API.post('/api/v1/auth/password/forgot', data)
}

/*
  Reset Password
*/
type ResetPasswordMutation = {
  data: z.infer<typeof resetPasswordSchema>
  token: string
}

export function resetPasswordMutation(payload: ResetPasswordMutation): Promise<{
  message: string
}> {
  return API.post(`/api/v1/auth/password/reset?token=${payload.token}`, payload.data)
}

/*
  Verify Email
*/
export function verifyEmailMutation(token: string): Promise<{
  message: string
}> {
  return API.post(`/api/v1/auth/email/verify?token=${token}`)
}

/*
  URL API Endpoints
*/

/*
  Create Short Url
*/
export async function createShortLinkMutation(data: z.infer<typeof createLinkSchema>): Promise<{
  data: {
    title: string
    shortUrlKey: string
    originalUrl: string
    isActive: boolean
    clicks: number
    createdAt: Date
  }
  message: string
}> {
  return await API.post('/api/v1/urls', data)
}

/*
  Get Url's
*/
export async function getLinksQuery(page: number): Promise<{
  data: {
    _id: string
    title: string
    shortUrlKey: string
    originalUrl: string
    isActive: boolean
    clicks: number
    userId: string
    createdAt: string
    updatedAr: string
  }[]
  meta: {
    page: number
    size: number
    totalPages: number
  }
}> {
  return await API.get(`/api/v1/urls?page=${page}`)
}

/*
  Get Url
*/
export async function getLinkQuery(shortUrlKey: string): Promise<{
  data: {
    title: string
    shortUrlKey: string
    originalUrl: string
    isActive: boolean
    clicks: number
    createdAt: Date
  }
  message: string
}> {
  return await API.get(`/api/v1/urls/${shortUrlKey}`)
}

/*
  Update Url
*/
type UpdateLinkMutation = {
  shortUrlKey: string
  data: z.infer<typeof updateLinkSchema>
}

export async function updateLinkMutation(payload: UpdateLinkMutation): Promise<{
  message: string
}> {
  return await API.patch(`/api/v1/urls/${payload.shortUrlKey}`, payload.data)
}

/*
  Delete Url
*/
export async function deleteLinkMutation(shortUrlKey: string): Promise<{
  message: string
}> {
  return await API.delete(`/api/v1/urls/${shortUrlKey}`)
}

/*
  Redirect Url
*/
export async function redirectQuery(shortUrlKey: string): Promise<{
  url: string
}> {
  return await API.get(`/api/v1/${shortUrlKey}`)
}

/*
  Get Url Stats
*/
export async function getLinksStatsQuery(): Promise<{
  data: {
    totalLinks: string
    totalClicks: string
    totalActiveLinks: string
  }
  message: string
}> {
  return await API.get(`/api/v1/urls/stats`)
}
