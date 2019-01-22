import React, { Component } from 'react'
import styled from 'styled-components'
import Light, { Type as LightType } from './Light'

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  min-height: 100%;
`
const Placeholder = styled.p`
  color: rgba(230,230,230,.3);
  margin: 0;
  font-weight: 400;
  font-size: 50px;
  text-align: center;
`

export default class Lights extends Component {
  public render() {
    return (
      <Section>
        {this.renderLights()}
      </Section>
    )
  }

  private renderLights() {
    const lights: LightType[] = [{
      id: 'test1',
      name: 'Testlampe 1',
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
      name: 'Testlampe 2',
      hue: 70,
      lightness: 50,
      power: false,
      intensity: 80,
      lastColors: [],
    }]
    if (lights.length <= 0) return <Placeholder>no lights available</Placeholder>
    return lights.map(light => <Light key={light.id} {...light} />)
  }
}
