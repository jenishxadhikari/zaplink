import { z } from 'zod'

const createUrlSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  originalUrl: z.url({ error: 'A valid url is required.' }).trim()
})

const updateUrlSchema = z.object({
  title: z.string({ error: 'Title is required.' }).trim().optional(),
  isActive: z.boolean()
})

export const UrlSchema = {
  createUrlSchema,
  updateUrlSchema
}
