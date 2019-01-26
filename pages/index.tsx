import dynamic from 'next/dynamic'
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, html, #__next {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue;
    overflow: hidden;
    color: rgba(254, 254, 254, 0.87);
    user-select: none;
    touch-action: manipulation;
  }
`

const Wrapper = styled.div`
  background: linear-gradient(to right, #4e4376, #2b5876);
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

// @ts-ignore
const Lights = dynamic(async () => import('../components/Lights'), {
  ssr: false,
})

export default () => (
  <Wrapper>
    <GlobalStyle />
    <Lights />
  </Wrapper>
)
