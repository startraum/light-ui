import React, { Component } from 'react'
import styled from 'styled-components'

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
    return <Placeholder>no lights available …</Placeholder>
  }
}
