import { Server } from 'socket.io'
import { Server as HttpServer } from 'http'
import { SOCKET_ID_PREFIX } from './constants'

export const sockets = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {},
  })

  io.on(SOCKET_ID_PREFIX.CONNECTION, (socket) => {
    socket.on(SOCKET_ID_PREFIX.DISCONNECT, () => {})
  })
}
