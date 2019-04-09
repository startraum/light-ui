import { promisify } from 'util'
import { createClient } from 'redis'
import { Light } from '../components/lightState'
import { LightUpdate } from './lights'

if (!process.env.REDIS_URL) throw new Error('REDIS_URL not provided!')

const subscriber = createClient({
  url: process.env.REDIS_URL,
})
const publisher = createClient({
  url: process.env.REDIS_URL,
})

subscriber.subscribe('light-updated')

interface LightUpdateEvent {
  id: string
  update: LightUpdate
}

export function subscribe(fn: (light: Light) => void) {
  subscriber.on('message', (channel, message) => {
    if (channel !== 'light-updated') return
    const light: Light = JSON.parse(message)
    fn(light)
  })
}

const p = promisify(publisher.publish.bind(publisher))
export async function publish({ id, update }: { id: string, update: LightUpdate }) {
  return p('update-light', JSON.stringify({ id, update }))
}
