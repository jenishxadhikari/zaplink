import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { app } from '@/app'
import { env } from '@/config/env'

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: env.APP_ORIGIN
  }
})

const userSocketMap: Record<string, string> = {}

io.on('connection', (socket) => {
  console.log('User connected : ', socket.id)
  const userId = socket.handshake.auth.userId as string

  if (userId) {
    console.log(userSocketMap)
    userSocketMap[userId] = socket.id
  }

  socket.on('disconnect', () => {
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId]
    }
    console.log('User disconnected:', socket.id)
  })
})

export function getUserSocketId(userId: string) {
  console.log(userSocketMap)

  return userSocketMap[userId]
}

export { io, server }
