import React from 'react'
import styled from 'styled-components'
import Light from './Light'
import connect, { LightWithChange } from '../lightState'

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

export default connect((props: { lights: LightWithChange[] }) => (
  <Section>
    {props.lights.length <= 0 && <Placeholder>no lights available</Placeholder>}
    {props.lights.map(light => <Light key={light.id} {...light} />)}
  </Section>
))
