import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
`

export interface PowerProps {
  size?: number
  on: boolean,
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void,
  className?: string
}

const Power = ({ onClick, className }: PowerProps) => (
  <Button onClick={onClick} className={className}>
    <svg version="1.1" viewBox="0 0 64 64">
      <path d="M56.826,32C56.826,18.311,45.689,7.174,32,7.174S7.174,18.311,7.174,32S18.311,56.826,32,56.826S56.826,45.689,56.826,32z   M34.437,31.962c0,1.301-1.054,2.356-2.356,2.356c-1.301,0-2.356-1.055-2.356-2.356V19.709c0-1.301,1.055-2.356,2.356-2.356  c1.301,0,2.356,1.054,2.356,2.356V31.962z M48.031,32.041c0,8.839-7.191,16.03-16.031,16.03s-16.031-7.191-16.031-16.03  c0-4.285,1.669-8.313,4.701-11.34c0.46-0.46,1.062-0.689,1.665-0.689s1.207,0.23,1.667,0.691c0.92,0.921,0.919,2.412-0.002,3.332  c-2.139,2.138-3.318,4.981-3.318,8.006c0,6.24,5.077,11.317,11.318,11.317s11.318-5.077,11.318-11.317  c0-3.023-1.176-5.865-3.314-8.003c-0.92-0.921-0.919-2.412,0.001-3.333c0.921-0.921,2.412-0.919,3.333,0.001  C46.364,23.734,48.031,27.76,48.031,32.041z"/>
    </svg>
  </Button>
)

export default styled(Power)`
  width: ${p => p.size || 50}px;
  height: ${p => p.size || 50}px;
  border-radius: 50%;
  outline: none;
  background: transparent;
  svg {
    width: 100%;
    height: 100%;
    transition-duration: 0.2s
    fill: ${p => p.on ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  }
`
