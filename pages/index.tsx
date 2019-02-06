import dynamic from 'next/dynamic'
import * as React from 'react'
import Head from 'next/head'
import styled, { createGlobalStyle } from 'styled-components'
import Loading from '../components/Loading'

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
  loading: Loading,
})

interface Ctx {
  url: {
    query: {
      advanced: any,
    },
  },
}
export default ({ url: { query: { advanced } } }: Ctx) => (
  <Wrapper>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <title>Light Control</title>
    </Head>
    <GlobalStyle />
    <Lights advanced={advanced} />
  </Wrapper>
)
