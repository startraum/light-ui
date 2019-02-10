import React, { MouseEvent } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: 0;
  padding: 0;
  margin: 0;
`

export interface FlashProps {
  size?: number
  on: boolean,
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void,
  className?: string
}

const Flash = ({ onClick, className }: FlashProps) => (
  <Button onClick={onClick} className={className}>
    <svg viewBox="0 0 493 493">
      <path d="M478.625 270.542L289.5 379.708 100.375 488.875C81.75 499.667 58.5 486.208 58.5 464.708V27.958c0-21.5 23.292-34.916 41.875-24.166l378.25 218.333c18.583 10.792 18.583 37.625 0 48.417z"/>
    </svg>
  </Button>
)

export default styled(Flash)`
  width: ${p => p.size || 50}px;
  height: ${p => p.size || 50}px;
  border-radius: 50%;
  outline: none;
  background: transparent;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    transition-duration: 0.2s;
    fill: ${p => p.on ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)'};
  }
`
