import { io } from 'socket.io-client'

import { env } from '@/config/env'

const socket = io(env.API_URL, {
  autoConnect: false
})

socket.on('connect', () => {
  console.log('Connected to socket!')
})

export { socket }
