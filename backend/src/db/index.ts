import mongoose from 'mongoose'

import { env } from '@/config/env'

export async function connectDB() {
  try {
    await mongoose.connect(env.DATABASE_URL)
    console.log('Connected to the database successfully.')
  } catch (error) {
    throw error
  }
}
