import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Lights from './Lights'

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue;
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  background: linear-gradient(to right, #4e4376, #2b5876);
  min-height: 100vh;
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
