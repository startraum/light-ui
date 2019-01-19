import React, { Component } from 'react'
import styled from 'styled-components'
import Slider from 'react-input-slider'
import Power from '../icons/Power'
import ColorWheel from './ColorWheel'

const Wrapper = styled.div`
  width: 100%;
  padding: 25px;
  margin: 25px 30px;
  border-radius: 20px;
  background-color: rgba(240, 240, 240, 0.15);
  max-width: 500px;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
`
const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Name = styled.h2`
  flex: 1;
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 32px;
`

export interface Type {
  id: string
  name: string
  color: string
  power: boolean
  intensity: number
  classes?: any
}
export interface State {
  power: boolean
  intensity: number
}

export default class Light extends Component<Type, State> {
  public state = {
    power: this.props.power,
    intensity: this.props.intensity,
  }

  public render() {
    return (
      <Wrapper>
        <NameWrapper>
          <Name>{this.props.name}</Name>
          <Power
            size={100}
            onClick={() => this.setState(state => ({ power: !state.power }))}
            on={this.state.power}
          />
        </NameWrapper>
        <ColorWheel />
      </Wrapper>
    )
  }
}
