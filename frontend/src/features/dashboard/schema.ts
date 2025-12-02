import { z } from 'zod'

export const createLinkSchema = z.object({
  title: z.string().trim().optional(),
  longUrl: z.url({ error: 'A valid url is required.' }).trim()
})

export const updateLinkSchema = z.object({
  title: z.string().trim().optional(),
  isActive: z.boolean()
})
