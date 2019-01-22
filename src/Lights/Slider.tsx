import React from 'react'
import Slider from 'react-input-range'
import styled from 'styled-components'
import './Slider.css'

export default styled(({ className, ...props }) => <div className={className}><Slider {...props } /></div>)`
  padding: 35px 15px 0;
`
