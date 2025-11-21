import express from 'express'
import cookieParser from "cookie-parser"
import helmet from 'helmet'
import compression from "compression"
import cors from "cors"

import { corsOptions } from '@/lib/cors'

import { healthRouter } from './features/health/health.routes'

const app = express()

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())

app.use("/api/v1", healthRouter)

export { app }
