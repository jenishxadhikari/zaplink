import { z } from 'zod'

export const createLinkSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  originalUrl: z.url({ error: 'A valid url is required.' }).trim()
})

export const updateLinkSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  isActive: z.boolean()
})

export const linkSchema = z.object({
  data: z
    .object({
      _id: z.string(),
      title: z.string(),
      shortUrlKey: z.string(),
      originalUrl: z.string(),
      isActive: z.boolean(),
      clicks: z.number(),
      userId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date()
    })
    .array(),
  meta: z.object({
    page: z.number(),
    size: z.number(),
    totalPages: z.number()
  })
})
