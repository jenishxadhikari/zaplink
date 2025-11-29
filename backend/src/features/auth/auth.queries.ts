import { Token } from '@/db/schema/token'

import type { Types } from 'mongoose'

type CreateToken = {
  token: string
  userId: Types.ObjectId
  type: 'verify' | 'reset' | '2fa' | 'refreshToken'
  expiresAt: Date
}

async function createToken({ token, userId, type, expiresAt }: CreateToken) {
  const tkn = await Token.create({
    token,
    userId,
    type,
    expiresAt
  })
  return tkn
}

async function deleteToken(token: string) {
  return await Token.deleteOne({
    token
  })
}

async function getTokenByToken(token: string) {
  const tkn = await Token.findOne({
    token
  })
  return tkn
}

export const AuthQueries = {
  createToken,
  deleteToken,
  getTokenByToken
}
