import { z } from 'zod'

export const createLinkSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  originalUrl: z.url({ error: 'A valid url is required.' }).trim()
})

export const updateLinkSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  isActive: z.boolean()
})
