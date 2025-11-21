import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.string({ message: 'PORT is required' }).optional().default('8080'),
  NODE_ENV: z
    .enum(['development', 'production'], { message: 'NODE_ENV is required' })
    .optional()
    .default('development'),
  ALLOWED_ORIGINS: z.array(z.string()).nonempty()
})

export const env = envSchema.parse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") ?? []
})
