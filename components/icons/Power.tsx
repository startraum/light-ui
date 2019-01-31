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
    <svg version="1.1" viewBox="0 0 156 156">
      <path d="M155.163,77.581c0,-42.778 -34.804,-77.581 -77.582,-77.581c-42.778,0 -77.581,34.803 -77.581,77.581c0,42.778 34.803,77.582 77.581,77.582c42.778,0 77.582,-34.804 77.582,-77.582Zm-69.966,-0.119c0,4.066 -3.294,7.363 -7.363,7.363c-4.065,0 -7.362,-3.297 -7.362,-7.363l0,-38.29c0,-4.066 3.297,-7.363 7.362,-7.363c4.066,0 7.363,3.294 7.363,7.363l0,38.29Zm42.481,0.247c0,27.622 -22.472,50.094 -50.097,50.094c-27.625,0 -50.097,-22.472 -50.097,-50.094c0,-13.39 5.216,-25.978 14.691,-35.437c1.438,-1.438 3.319,-2.153 5.203,-2.153c1.884,0 3.772,0.718 5.21,2.159c2.875,2.878 2.871,7.538 -0.007,10.413c-6.684,6.681 -10.368,15.565 -10.368,25.018c0,19.5 15.865,35.366 35.368,35.366c19.503,0 35.369,-15.866 35.369,-35.366c0,-9.447 -3.675,-18.328 -10.356,-25.009c-2.875,-2.878 -2.872,-7.538 0.003,-10.416c2.878,-2.878 7.537,-2.872 10.415,0.003c9.457,9.463 14.666,22.044 14.666,35.422Z" style={{ fillRule: 'nonzero' }} />
    </svg>
  </Button>
)

export default styled(Power)`
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
    fill: ${p => p.on ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
  }
`
