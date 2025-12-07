import { Types } from 'mongoose'

import { Url } from '@/db/schema/url'

type CreateUrl = {
  title?: string
  shortUrlKey: string
  originalUrl: string
  userId: Types.ObjectId
  expiresAt?: Date
}

async function createUrl({ title, shortUrlKey, originalUrl, userId, expiresAt }: CreateUrl) {
  const url = await Url.create({
    title,
    shortUrlKey,
    originalUrl,
    userId,
    expiresAt
  })
  return url
}


type UpdateUser = {
  id: string
  title?: string
  isActive?: boolean
}

async function updateUrl({ id, title, isActive }: UpdateUser) {
  await Url.findByIdAndUpdate(id, {
    title,
    isActive
  })
}

async function getUrl(shortUrlKey: string) {
  const url = await Url.findOne({ shortUrlKey })
  return url
}

async function deleteUrl(id: string) {
  const url = await Url.findByIdAndDelete(id)
  return url
}

type GetUrls = {
  userId: Types.ObjectId
  skip: number
}

async function getUrls({ userId, skip }: GetUrls) {
  const urls = await Url.find({
    userId
  }).sort({ createdAt: -1 }).skip(skip).limit(6)
  return urls
}

async function getTotalUrls(userId: Types.ObjectId) {
  const result = await Url.find({ userId })
  return result.length
}

async function incrementClick(shortUrlKey: string) {
  const url = await Url.findOneAndUpdate({ shortUrlKey }, { $inc: { clicks: 1 } }, { new: true })
  return url
}

export const UrlQueries = {
  createUrl,
  updateUrl,
  getUrl,
  deleteUrl,
  getUrls,
  getTotalUrls,
  incrementClick
}
