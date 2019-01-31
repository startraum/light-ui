import { Light } from '../components/lightState'

const lights: { [key: string]: Light } = {}

export function getLights() {
  return Object.keys(lights).reduce((arr: Light[], id) => [...arr, lights[id]], [])
}

export function getLight(id: string) {
  return lights[id]
}

export function updateLight(light: Light) {
  lights[light.id] = light
}
