import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Color from 'color'
import Power from '../icons/Power'
import Lock from '../icons/Lock'
import Animation from '../icons/Animation'
import Slider from './Slider'
import UnstyledColorWheel from './ColorWheel/index'
import { LightWithChange, Color as ColorType, presetColors } from '../lightState'

const gradientAnimation = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
`

const Wrapper = styled.div<{ on: boolean, sealed: boolean }>`
  opacity: ${p => p.on && !p.sealed ? 1 : 0.5};
  pointer-events: ${p => p.sealed ? 'none' : 'all'};
  transition-duration: .3s;
  width: 100%;
  padding: 20px 20px 20px;
  margin: 15px;
  border-radius: 20px;
  background-color: rgba(240, 240, 240, 0.15);
  max-width: 500px;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
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
const ColorDotContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 35px 0;
`
const ColorDot = styled.button.attrs((p: any) => ({
  style: {
    background:  !p.invisible ? p.color || 'rgba(228, 228, 228, .1)' : 'none',
  },
}))<{ active: boolean, color?: string, disabled?: boolean, invisible?: boolean }>`
  border-radius: 50%;
  ${p => p.active ? `border: 5px solid ${p.color === '#fff' ? 'rgba(42, 42, 42, 0.4)' : 'rgba(254, 254, 254, 0.9)'};` : 'border: 0 solid transparent;'}
  outline: none;
  padding: 0;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  transition: border 0.3s;
  cursor: ${p => p.disabled ? 'auto' : 'pointer'};
  box-shadow: ${p => p.invisible ? 'none' : `0px 3px 20px 0 rgba(28, 28, 28, ${p.disabled ? '.1' : '.3'})`};
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`
const AnimWrap = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, rgba(102,204,153,1) 12.5%,rgba(230,0,125,1) 47.5%, rgba(230,0,125,1) 52.5%, rgba(102,204,153,1) 88.5%);
  background-size: 200%;
`
const animateGradient = css`
  animation: ${gradientAnimation} 2.4s linear infinite;
`
const AnimationTrigger = styled.button.attrs<{ active: boolean }>(p => ({
  children: <AnimWrap><Animation on={p.active} size={25} /></AnimWrap>,
}))<{ active: boolean }>`
  border-radius: 50%;
  ${p => p.active ? 'border: 5px solid rgba(254, 254, 254, 0.9);' : 'border: 0 solid transparent;'}
  outline: none;
  padding: 0;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  transition: border 0.3s;
  overflow: hidden;
  cursor: ${p => p.disabled ? 'auto' : 'pointer'};
  box-shadow: ${p => `0px 3px 20px 0 rgba(28, 28, 28, ${p.disabled ? '.1' : '.3'})`};
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  ${Animation} {
    margin-top: 2px;
    padding-left: 1px;
  }
  ${AnimWrap} {
    ${p => p.active ? animateGradient : 'animation: none;'};
  }
`

const ColorWheel = styled(UnstyledColorWheel)``
const activeStyle = css`
  height: 305px;
  margin-bottom: 20px;
  opacity: 1;
  pointer-events: all;
  ${ColorWheel} {
    transform: scale(1);
  }
`
const ColorWheelWrapper = styled.div<{ active: boolean }>`
  height: 0;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  margin-top: 0;
  transition: opacity 0.3s ease ${p => p.active ? 0.1 : 0}s, height 0.3s ease ${p => p.active ? 0 : 0.1}s, margin-top 0.3s ease ${p => p.active ? 0 : 0.1}s;
  ${ColorWheel} {
    transition-duration: 0.3s;
    transition-delay: ${p => p.active ? 0.1 : 0}s;
    transform: scale(0.01);
  }
  ${p => p.active && activeStyle};
`
export interface State {
  colorWheelOpened: boolean,
  colorIndex?: number
}

interface Props extends LightWithChange {
  advanced: boolean
  admin: boolean
}

export default class Light extends Component<Props, State> {
  public state: State = {
    colorWheelOpened: false,
    colorIndex: undefined,
  }

  public render() {
    return (
      <Wrapper on={this.props.power} sealed={this.props.locked && !this.props.admin}>
        <NameWrapper>
          <Name>{this.props.name}</Name>
          {this.props.admin && (
            <Lock
              size={50}
              onClick={() => this.setLocked(!this.props.locked)}
              locked={this.props.locked}
            />
          )}
          <Power
            size={50}
            onClick={() => this.setPower(!this.props.power)}
            on={this.props.power}
          />
        </NameWrapper>
        <Slider
          formatLabel={(value: number) => `${Math.round(value)}%`}
          minValue={0}
          maxValue={100}
          disabled={this.props.animation}
          value={this.props.intensity}
          onChange={(intensity: number) => this.setIntensity(intensity)}
        />
        <ColorDotContainer>
          <AnimationTrigger
            active={this.props.animation}
            onClick={() => this.props.onChange({ animation: !this.props.animation })}
          />
          {presetColors.map((color, index) => (
            <ColorDot
              key={index}
              active={color && this.isColorActive(color)}
              color={color ? color.colorCode || Color.hsl(color.hue, 100, color.lightness).hex() : ''}
              disabled={!color}
              onClick={() => {
                if (!color) return
                this.closeWheel(() =>
                  this.setColor(color))
              }}
            />
          ))}
        </ColorDotContainer>
        {this.props.advanced && (
          <ColorDotContainer>
            {(this.props.colors || []).map((color, index) => (
              <ColorDot
                key={index}
                active={color && this.isColorActive(color)}
                color={color ? color.colorCode || Color.hsl(color.hue, 100, color.lightness).hex() : ''}
                disabled={!color}
                onClick={() => {
                  if (!color) return
                  if (!this.isColorActive(color)) {
                    this.closeWheel(() => {
                      this.setState({ colorIndex: index })
                      this.setColor(color)
                    })
                  } else if (!this.state.colorWheelOpened) {
                    this.setState({ colorWheelOpened: true, colorIndex: index })
                  } else {
                    this.closeWheel()
                  }
                }}
              />
            ))}
          </ColorDotContainer>
        )}
        <ColorWheelWrapper active={this.state.colorWheelOpened}>
          <ColorWheel
            hue={this.props.hue}
            active={this.state.colorWheelOpened}
            lightness={this.props.lightness}
            onChange={(hue, saturation, lightness) => this.setColor({ hue, lightness })}
            onClose={() => this.closeWheel()}
          />
        </ColorWheelWrapper>
      </Wrapper>
    )
  }

  private closeWheel(cb?: () => void) {
    this.setState({ colorWheelOpened: false, colorIndex: undefined }, cb)
  }

  private setPower(power: boolean) {
    this.props.onChange({ power })
  }

  private setLocked(locked: boolean) {
    this.props.onChange({ locked })
  }

  private setIntensity(intensity: number) {
    const change = {
      intensity,
      power: intensity > 0,
    }
    this.props.onChange(change)
    if (this.state.colorIndex != null) this.props.onPersistColor(this.state.colorIndex)
  }

  private setColor(color: ColorType) {
    this.props.onChange(color)
    if (this.state.colorIndex != null) this.props.onPersistColor(this.state.colorIndex)
  }

  private isColorActive(color: { hue: number, lightness: number }) {
    return !this.props.animation && color.hue === this.props.hue && color.lightness === this.props.lightness
  }
}
