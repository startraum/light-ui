import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.p`
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  margin: 0;
  color: rgba(254, 254, 254, 0.54);
  a {
    color: rgba(254, 254, 254, 0.54);
  }
`

export default () => (
  <Wrapper>
    &copy; 2019 by&nbsp;
    <a href="https://creators-collective.com/" target="_blank">Paul Weber</a>,&nbsp;
    <a href="http://paulvanlaar.com/" target="_blank">Paul van Laar</a> &amp;&nbsp;
    <a href="mailto:max.nowack@posteo.de">Max Nowack</a>
  </Wrapper>
)
