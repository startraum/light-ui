import { Light, Color } from '../components/lightState'
import { Publisher, Subscriber } from 'cote'
import io from './socketio'
import { updateLight, getLights } from './lights'

interface LightUpdate {
  hue?: number
  lightness?: number
  power?: boolean
  intensity?: number
  lastColors?: Color[]
}

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
  io.emit('lights', getLights())
})

io.on('connection', socket => {
  console.log('client connected', socket.handshake.address)
  socket.emit('lights', getLights())

  socket.on('update', (id: string, update: LightUpdate) => {
    // @ts-ignore
    publisher.publish<LightUpdateEvent>('update', { id, update })
  })
})
