import jwt from 'jsonwebtoken'

import type { Types } from 'mongoose'

import { env } from '@/config/env'

import { AuthQueries } from './auth.queries'
import { sendMail } from '@/lib/mail'
import { MailTemplate } from '@/lib/mail-template'

export type TokenPayload = {
  id: string
}

function createAccessToken(payload: TokenPayload) {
  const token = jwt.sign(payload, env.SECRET_KEY, {
    expiresIn: 15 * 60
  })
  return token
}

function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.SECRET_KEY) as TokenPayload
  return payload
}

async function createRefreshToken(_id: Types.ObjectId) {
  const { token } = await AuthQueries.createToken({
    token: crypto.randomUUID(),
    userId: _id,
    type: 'refreshToken',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  })
  return token
}

async function verifyRefreshToken(token: string) {
  const tkn = await AuthQueries.getTokenByToken(token)
  if (!tkn) {
    return null
  }
  return {
    id: String(tkn.userId)
  }
}

type Mail = {
  id: Types.ObjectId
  email: string
}

async function sendVerificationMail({ id, email }: Mail) {
  const { token } = await AuthQueries.createToken({
    token: crypto.randomUUID(),
    userId: id,
    type: 'verify',
    expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000)
  })

  const { subject, html } = MailTemplate.verifyEmailTemplate(token)

  await sendMail({
    to: email,
    subject: subject,
    html: html
  })
}

async function sendResetPasswordMail({ id, email }: Mail) {
  const { token } = await AuthQueries.createToken({
    token: crypto.randomUUID(),
    userId: id,
    type: 'reset',
    expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000)
  })

  const { subject, html } = MailTemplate.resetPasswordTemplate(token)

  await sendMail({
    to: email,
    subject: subject,
    html: html
  })
}

export const AuthService = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  sendVerificationMail,
  sendResetPasswordMail
}