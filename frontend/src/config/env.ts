import { z } from 'zod'

const envSchema = z.object({
  API_URL: z.string({ error: 'API_URL is required.' }).nonempty()
})

export const env = envSchema.parse({
  API_URL: import.meta.env.VITE_API_URL,
})
