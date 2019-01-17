import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Lights from './Lights'

const GlobalStyle = createGlobalStyle`
  body, html, #root {
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
  }
`

const Wrapper = styled.div`
  background: linear-gradient(to right, #4e4376, #2b5876);
  min-height: 100%;
  overflow: auto;
`

class App extends Component {
  public render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <Lights />
      </Wrapper>
    )
  }
}

export default App
