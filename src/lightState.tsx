import React, { Component } from 'react'
import update from 'immutability-helper'

export const lastColorCount = 4

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

const initialData = [{
  id: 'test1',
  name: 'Eingang',
  hue: 10,
  lightness: 80,
  power: true,
  intensity: 100,
  lastColors: [{
    hue: 10,
    lightness: 80,
  }, {
    hue: 170,
    lightness: 60,
  }],
}, {
  id: 'test2',
  name: 'Coworking',
  hue: 70,
  lightness: 50,
  power: false,
  intensity: 80,
  lastColors: [{
    hue: 363,
    lightness: 75,
  }, {
    hue: 45,
    lightness: 53,
  }, {
    hue: 79,
    lightness: 64,
  }],
}, {
  id: 'test3',
  name: 'Factory',
  hue: 250,
  lightness: 50,
  power: false,
  intensity: 40,
  lastColors: [{
    hue: 179,
    lightness: 49,
  }, {
    hue: 283,
    lightness: 67,
  }, {
    hue: 320,
    lightness: 71,
  }, {
    hue: 170,
    lightness: 100,
  }],
}]

export default function connect(Comp: any) {
  return class Wrapper extends Component {
    public state: { lights: Light[] } = {
      lights: initialData,
    }

    public render() {
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
        if (!lastColors.filter(c => c.hue === hue && c.lightness === lightness)[0]) {
          lastColors.unshift({ hue: l.hue, lightness: l.lightness })
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
          [index]: (light: Light) => {
            const newLight = change(light)
            console.log(index, newLight)
            return newLight
          },
        },
      }))
    }

    private getLights() {
      return this.state.lights.map((light, index) => ({
        ...light,
        onPersistColor: () => this.persistColor(index),
        onChange: (change: Change) => this.updateLight(index, l => ({
          ...l,
          ...change,
        })),
      }))
    }
  }
}
