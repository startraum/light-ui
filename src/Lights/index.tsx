import React, { Component } from 'react'
import styled from 'styled-components'
import Light, { Type as LightType } from './Light'

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 100vh;
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
      id: 'test',
      name: 'Testlampe',
      color: '#00ff00',
      power: true,
      intensity: 1,
    }]
    if (lights.length <= 0) return <Placeholder>no lights available</Placeholder>
    return lights.map(light => <Light key={light.id} {...light} />)
  }
}
