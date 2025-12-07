import crypto from 'crypto'
import { Types } from 'mongoose'

import { UrlQueries } from './url.queries'

type CreateShortUrl = {
  title?: string
  originalUrl: string
  userId: Types.ObjectId
  expiresAt?: Date
}

async function createShortUrl({ title, originalUrl, userId, expiresAt }: CreateShortUrl) {
  const shortUrlKey = crypto.randomBytes(6).toString('base64url')
  
  const url = await UrlQueries.createUrl({
    title,
    shortUrlKey,
    originalUrl,
    userId,
    expiresAt
  })

  return url
}

export const UrlService = {
  createShortUrl
}
