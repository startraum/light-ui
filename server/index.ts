import './env'
import { subscribe, publish } from './redis'
import io from './socketio'
import { updateLight, patchLight, getLights, LightUpdate } from './lights'

subscribe(light => {
  updateLight(light)
  io.emit('lights', getLights())
})

const logAndCrash = (error: Error) => {
  console.error(error)
  process.exit(1)
}

io.on('connection', socket => {
  socket.emit('lights', getLights())

  socket.on('update', ({ id, update }: { id: string, update: LightUpdate }) => {
    patchLight(id, update)
    publish({ id, update }).catch(logAndCrash)
  })
})
