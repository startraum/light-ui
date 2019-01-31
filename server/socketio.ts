import socketIO from 'socket.io'
import server from './http'

export default socketIO(server, { path: '/data' })
