import React, { Component } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'

export type CanvasGenerator = (size: number) => HTMLCanvasElement

const Wrapper: AnyStyledComponent = styled.div<{ size: number, backgroundUrl: string, rotation: number }>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  &:before {
    content: "";
    position: absolute;
    width: ${p => p.size}px;
    height: ${p => p.size}px;
    top: 0;
    left: 0;
    background: url(${p => p.backgroundUrl});
    perspective: 1000;
    transform: translateZ(0) translate3d(0, 0, 0) rotate(${p => p.rotation}deg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`
const ChildWrapper = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  background: rgba(64, 64, 64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 224, 224, 0.4);
  font-size: 20px;
`
const Lightness = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 4px;
  height: 30%;
  background-color: rgba(64, 64, 64, 0.6);
`
const Handle: AnyStyledComponent = styled.div<{ color: string }>`
  height: 30px;
  width: 30px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 50%;
  border: 3px solid #fff;
  background: ${p => p.color};
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
`

export interface Props {
  size?: number
  lightness?: number
  generateCanvas?: CanvasGenerator
}

interface State {
  lightness: number
  rotation: number
}

const stopPropagation = (event: React.TouchEvent | React.MouseEvent) => event.stopPropagation()
const getRotation = (x: number, y: number) => {
  const radians	= Math.atan2(x, y)
  const degrees	= Math.round((radians * (180 / Math.PI) * -1) + 100)
  return degrees < 0 ? 360 - Math.abs(degrees) : degrees
}

export default class ColorWheel extends Component<Props, State> {
  public static defaultProps = {
    size: 250,
    lightness: 100,
    children: 'done',
    generateCanvas(size: number) {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      context.scale(2, 2)
      const x = size / 4 // Canvas center X (divided by 4 because of retina)
      const y = size / 4 // Canvas center Y (divided by 4 because of retina)
      const r = x // Canvas radius
      const d2r = Math.PI / 180 // Degrees to radians

      for (let angle = 0; angle <= 360; angle++) {
        const arc_start = -((angle + 90) * d2r)
        const arc_end = -((angle + 88) * d2r)

        // Draw shape
        context.beginPath()
        context.moveTo(x, y)
        context.arc(x, y, r, arc_start, arc_end, false)
        context.closePath()

        // Generate gradient for shape
        const gradient = context.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0.5, 'hsl(' + angle + ', 10%, 100%)')
        gradient.addColorStop(0.75, 'hsl(' + angle + ', 100%, 70%)')
        gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 30%)')

        context.fillStyle = gradient
        context.fill()
      }
      return canvas
    },
  }

  public canvas?: HTMLCanvasElement
  public backgroundUrl?: string
  public state = {
    lightness: this.props.lightness as number,
    rotation: 0,
  }

  private handleRef = React.createRef<AnyStyledComponent>()
  private wrapperRef = React.createRef<AnyStyledComponent>()
  private startRotation?: number
  private startStateRotation?: number

  public componentWillMount() {
    this.canvas = (this.props.generateCanvas as CanvasGenerator)(this.props.size as number)
    this.backgroundUrl = this.canvas.toDataURL('image/png', 1)
  }

  public render() {
    return (
      <Wrapper
        ref={this.wrapperRef}
        size={this.props.size as number}
        backgroundUrl={this.backgroundUrl as string}
        rotation={this.state.rotation}
        onTouchStart={this.handleTouchStart}
        onMouseDown={this.handleMouseStart}
        onTouchMove={this.handleTouchMove}
        onMouseMove={this.handleMouseMove}
        onTouchEnd={this.handleTouchEnd}
        onMouseUp={this.handleMouseEnd}
      >
        <Lightness
          onTouchStart={stopPropagation}
          onTouchMove={stopPropagation}
          onTouchEnd={stopPropagation}
          onMouseDown={stopPropagation}
          onMouseMove={stopPropagation}
          onMouseUp={stopPropagation}
        >
          <Handle
            ref={this.handleRef}
            outerSize={this.props.size}
            value={this.state.lightness}
          />
        </Lightness>
        <ChildWrapper>{this.props.children}</ChildWrapper>
      </Wrapper>
    )
  }

  private getRotation(x: number, y: number) {
    const r = this.props.size as number / 4
    const wrapper = (this.wrapperRef.current as unknown) as Element
    const { top, left } = wrapper.getBoundingClientRect()
    return getRotation(x - (left + (r * 2)), y - (top + (r * 2)))
  }

  private handleTouchStart = (event: React.TouchEvent) => {
    const item = event.touches.item(0)
    this.handleStart(item.pageX, item.pageY)
  }

  private handleMouseStart = (event: React.MouseEvent) => {
    this.handleStart(event.pageX, event.pageY)
  }

  private handleStart = (x: number, y: number) => {
    this.startRotation = this.getRotation(x, y)
    this.startStateRotation = this.state.rotation
  }

  private handleTouchMove = (event: React.TouchEvent) => {
    const item = event.touches.item(0)
    this.handleMove(item.pageX, item.pageY)
  }

  private handleMouseMove = (event: React.MouseEvent) => {
    this.handleMove(event.pageX, event.pageY)
  }

  private handleMove = (x: number, y: number) => {
    if (this.startRotation == null || this.startStateRotation == null) return
    const start = this.startRotation
    const rotation = this.startStateRotation
    const end = this.getRotation(x, y)
    const newRotation = rotation + (end - start + (end < start ? 360 : 0))
    this.setState({
      rotation: newRotation,
    })
  }

  private handleTouchEnd = (event: React.TouchEvent) => {
    this.handleEnd()
  }

  private handleMouseEnd = (event: React.MouseEvent) => {
    this.handleEnd()
  }

  private handleEnd = () => {
    this.startRotation = undefined
    this.startStateRotation = undefined
  }
}
