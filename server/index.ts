import { Light } from '../components/lightState'
import { Publisher, Subscriber } from 'cote'
import io from './socketio'
import { updateLight, patchLight, getLights, LightUpdate } from './lights'

interface LightEvent extends Event {
  light: Light
}

interface LightUpdateEvent extends Event {
  id: string
  update: LightUpdate
}

const subscriber = new Subscriber({ name: 'lightsBroadcast' })
const publisher = new Publisher({ name: 'lightsBroadcast' })
subscriber.on('light', (event: LightEvent) => {
  updateLight(event.light)
  console.log('updated', event.light)
  io.emit('lights', getLights())
})

io.on('connection', socket => {
  console.log('client connected', socket.handshake.address)
  socket.emit('lights', getLights())

  socket.on('update', ({ id, update }: { id: string, update: LightUpdate }) => {
    console.log('control', id, update)
    patchLight(id, update)
    // @ts-ignore
    publisher.publish<LightUpdateEvent>('update', { id, update })
  })
})
