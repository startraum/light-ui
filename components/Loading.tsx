import React from 'react'
import styled from 'styled-components'

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

export default () => (
  <Section>
    <Placeholder>loading …</Placeholder>
  </Section>
)
