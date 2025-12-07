import { Types } from 'mongoose'
import z from 'zod'

import type { Request, Response } from 'express'

import { asyncHandler } from '@/lib/async-handler'
import { CustomError } from '@/lib/api-error'
import { getUserSocketId, io } from '@/lib/socket'
import { StatusCodes } from '@/config/http-status-codes'

import { UrlSchema } from './url.schema'
import { UrlService } from './url.service'
import { UrlQueries } from './url.queries'

const createUrl = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const { title, originalUrl }: z.infer<typeof UrlSchema.createUrlSchema> = req.body

  const url = await UrlService.createShortUrl({
    title,
    originalUrl,
    userId: new Types.ObjectId(user.id)
  })

  return res.status(StatusCodes.CREATED).json({
    data: {
      title: url.title,
      shortUrlKey: url.shortUrlKey,
      originalUrl: url.originalUrl,
      isActive: url.isActive,
      clicks: url.clicks,
      createdAt: url.createdAt
    },
    message: 'Short url generated successfully.'
  })
})

const redirectToOriginalUrl = asyncHandler(async (req: Request, res: Response) => {
  const shortUrlKey = req.params.shortUrlKey

  const url = await UrlQueries.getUrl(shortUrlKey)
  if (!url || !url.isActive) {
    throw new CustomError.NotFoundError('URL not found.')
  }

  const result = await UrlQueries.incrementClick(shortUrlKey)
  if (!result) {
    throw new CustomError.InternalServerError('Something went wrong.')
  }

  const userSocketId = getUserSocketId(String(url.userId))
  if (userSocketId) {
    io.to(userSocketId).emit('click-updated', {
      shortUrlKey: result.shortUrlKey,
      clicks: result.clicks
    })
  }

  return res.status(StatusCodes.OK).json({
    url: url.originalUrl
  })
})

const getUrls = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user
  const userId = new Types.ObjectId(user.id)

  const page = Number(req.query.page) ?? 1
  const pageSize = 6
  const skip = pageSize * (page - 1)

  const urls = await UrlQueries.getUrls({
    userId,
    skip
  })

  const totalUrls = await UrlQueries.getTotalUrls(userId)

  return res.status(StatusCodes.OK).json({
    urls: {
      ...urls
    },
    metadata: {
      page: page,
      page_size: pageSize,
      total_pages: Math.ceil(totalUrls / pageSize),
      total_count: totalUrls
    },
    message: `URL's fetched successfully.`
  })
})

const getUrl = asyncHandler(async (req: Request, res: Response) => {
  const shortUrlKey = req.params.shortUrlKey
  const user = req.user

  const url = await UrlQueries.getUrl(shortUrlKey)
  if (!url || user.id !== String(url.userId)) {
    throw new CustomError.NotFoundError('URL not found.')
  }

  return res.status(StatusCodes.OK).json({
    data: {
      title: url.title,
      shortUrlKey: url.shortUrlKey,
      originalUrl: url.originalUrl,
      isActive: url.isActive,
      clicks: url.clicks,
      createdAt: url.createdAt
    },
    message: 'URL fetched successfully.'
  })
})

const updateUrl = asyncHandler(async (req: Request, res: Response) => {
  const shortUrlKey = req.params.shortUrlKey
  const user = req.user
  const { title, isActive }: z.infer<typeof UrlSchema.updateUrlSchema> = req.body

  const url = await UrlQueries.getUrl(shortUrlKey)
  console.log(url)
  if (!url || user.id !== String(url.userId)) {
    throw new CustomError.NotFoundError('URL not found.')
  }

  await UrlQueries.updateUrl({
    id: url.id,
    title,
    isActive
  })

  return res.status(StatusCodes.OK).json({
    message: 'URL updated successfully.'
  })
})

const deleteUrl = asyncHandler(async (req: Request, res: Response) => {
  const shortUrlKey = req.params.shortUrlKey
  const user = req.user

  const url = await UrlQueries.getUrl(shortUrlKey)
  console.log(url)
  if (!url || user.id !== String(url.userId)) {
    throw new CustomError.NotFoundError('URL not found.')
  }

  await UrlQueries.deleteUrl(url.id)

  return res.status(StatusCodes.OK).json({
    message: 'URL deleted successfully.'
  })
})

export const UrlController = {
  createUrl,
  getUrl,
  updateUrl,
  deleteUrl,
  getUrls,
  redirectToOriginalUrl
}
