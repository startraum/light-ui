import React, { Component } from 'react'
import update from 'immutability-helper'
import io from 'socket.io-client'
import Loading from './Loading'

export const lastColorCount = 4
const colorTolerance = 50

export interface Change {
  hue?: number
  lightness?: number
  power?: boolean
  intensity?: number
}

export interface Color {
  hue: number
  lightness: number
}

export interface Light {
  id: string
  name: string
  hue: number
  lightness: number
  power: boolean
  intensity: number
  lastColors: Color[]
}

export interface LightWithChange extends Light {
  onChange: (change: Change) => void
  onPersistColor: () => void
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

    private persistColor(index: number) {
      this.updateLight(index, l => {
        const { hue, lightness } = l
        const lastColors = l.lastColors
        let similarIndex: number | undefined
        const similarColors = lastColors.filter((c, colorIndex) => {
          const match = (c.hue + colorTolerance >= hue && c.hue - colorTolerance <= hue) &&
          (c.lightness + colorTolerance >= lightness && c.lightness - colorTolerance <= lightness)
          if (match) similarIndex = colorIndex
          return match
        })
        if (similarColors.length <= 0) {
          lastColors.unshift({ hue: l.hue, lightness: l.lightness })
        } else if (similarIndex != null) {
          lastColors[similarIndex] = { hue: l.hue, lightness: l.lightness }
        }

        return {
          ...l,
          lastColors: lastColors.slice(0, lastColorCount + 1),
        }
      })
    }

    private updateLight(index: number, change: (light: Light) => Light) {
      this.setState(state => update(state, {
        lights: {
          [index]: (light: Light) => change(light),
        },
      }))
    }

    private getLights() {
      return this.state.lights.map((light, index) => ({
        ...light,
        onPersistColor: () => this.persistColor(index),
        onChange: (change: Change) => this.updateLight(index, l => ({
          ...l,
          power: true,
          ...change,
        })),
      }))
    }
  }
}
