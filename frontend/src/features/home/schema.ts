import { z } from 'zod'

export const originalUrlSchema = z.object({
  originalUrl: z.url({ error: 'A valid url is required.' }).trim()
})
