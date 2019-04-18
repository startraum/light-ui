import { Light, Color } from '../components/lightState'

export interface LightUpdate {
  hue?: number
  lightness?: number
  power?: boolean
  intensity?: number
  lastColors?: Color[]
}

const lights: { [key: string]: Light } = {}
if (process.env.NODE_ENV !== 'production') {
  lights.default = {
    name: 'default',
    id: 'default',
    locked: false,
    hue: 0,
    lightness: 0,
    intensity: 0,
    power: true,
    animation: false,
    colors: [{
      hue: 0,
      intensity: 100,
      lightness: 50,
    }, {
      hue: 50,
      intensity: 100,
      lightness: 60,
    }, {
      hue: 150,
      intensity: 75,
      lightness: 80,
    }, {
      hue: 327.39,
      lightness: 50,
      intensity: 100,
    }],
    lastUpdate: Date.now(),
  }
}

export function getLights() {
  return Object.keys(lights).reduce((arr: Light[], id) => [...arr, lights[id]], [])
}

export function getLight(id: string) {
  return lights[id]
}

export function patchLight(id: string, update: LightUpdate) {
  lights[id] = { ...lights[id], ...update, lastUpdate: Date.now() }
}

export function updateLight(light: Light) {
  lights[light.id] = light
}
