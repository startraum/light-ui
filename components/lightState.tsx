import React, { Component } from 'react'
import update from 'immutability-helper'
import io from 'socket.io-client'
import Loading from './Loading'

export const presetColors: Color[] = [{
  hue: 0,
  intensity: 100,
  lightness: 100,
}, {
  hue: 50,
  intensity: 100,
  lightness: 90,
}, {
  hue: 150,
  intensity: 75,
  lightness: 80,
}, {
  hue: 327.39,
  lightness: 50,
  intensity: 100,
}]

export interface Change {
  hue?: number
  lightness?: number
  power?: boolean
  intensity?: number
}

export interface Color {
  hue: number
  lightness: number
  intensity?: number
}

export interface Light {
  id: string
  name: string
  hue: number
  lightness: number
  power: boolean
  intensity: number
  colors: Color[]
}

export interface LightWithChange extends Light {
  onChange: (change: Change) => void
  onPersistColor: (colorIndex: number) => void
}

export default function connect(Comp: any) {
  return class Wrapper extends Component {
    public state: { lights: Light[], loading: boolean } = {
      lights: [],
      loading: true,
    }

    private socket: SocketIOClient.Socket | undefined

    public componentWillMount() {
      this.socket = io({
        path: '/data',
      })

      this.socket.on('lights', (lights: Light[]) => {
        this.setState({ lights, loading: false })
      })
    }

    public componentWillUnmount() {
      const socket = this.socket as SocketIOClient.Socket
      socket.close()
    }

    public render() {
      if (this.state.loading) return <Loading />
      return (
        // @ts-ignore
        <Comp
          {...this.props}
          lights={this.getLights()}
        />
      )
    }

    private persistColor(index: number, colorIndex: number) {
      this.updateLight(index, (l: Light) => {
        const { hue, lightness, intensity } = l
        const colors = l.colors
        colors[colorIndex] = { hue, lightness, intensity }

        return { ...l, colors }
      })
    }

    private updateLight(index: number, change: any) {
      this.setState(state => update(state, {
        lights: {
          [index]: (light: Light) => {
            if (!this.socket) return
            const c = change(light)
            this.socket.emit('update', { id: light.id, update: c })
            return {
              ...light,
              ...c,
            }
          },
        },
      }))
    }

    private getLights() {
      return this.state.lights.map((light, index) => ({
        ...light,
        onPersistColor: (colorIndex: number) => this.persistColor(index, colorIndex),
        onChange: (change: Change) => this.updateLight(index, () => ({
          power: true,
          ...change,
        })),
      }))
    }
  }
}
