import React, { Component } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'
import Color from 'color'
// @ts-ignore
import Rotator from '@radial-color-picker/rotator'
import Lightness from './Lightness'
import getContrastColor from '../../utils/getContrastColor'

export type CanvasGenerator = (size: number) => HTMLCanvasElement

const Wrapper: AnyStyledComponent = styled.div<{ size: number }>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: 50%;
  position: relative;
  border: 1px solid rgba(64, 64, 64, 0.6);
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  cursor: grab;
  box-sizing: border-box;
`
const BackgroundHelper = styled.div.attrs<{ backgroundUrl: string, rotation: number }>({
  style: (p: any) => ({ transform: `translateZ(0) translate3d(0, 0, 0) rotate(${p.rotation}deg)` }),
})<{ backgroundUrl: string, rotation: number }>`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${p => p.backgroundUrl});
  background-size: 100%;
  perspective: 1000;
`
const ChildWrapper = styled.span.attrs<{ color: string, dragging: boolean }>(p => ({
  children: 'done',
  style: {
    backgroundColor: p.color,
    color: getContrastColor(p.color).alpha(0.4).toString(),
  },
}))<{ color: string, dragging: boolean }>`
  outline: none;
  cursor: pointer;
  border: 0;
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  background-color: rgba(64, 64, 64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(224, 224, 224, 0.4);
  font-size: 20px;
  transition: color 0.1s;
`
const Rotate: AnyStyledComponent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
`

export interface Props {
  size?: number
  hue: number
  lightness: number
  onChange: (hue: number, saturation: number, lightness: number) => void
  generateCanvas?: CanvasGenerator
  className?: string
  onClose: () => void
}

interface State {
  lightness: number
  hue: number
  color?: string
  dragging: boolean
}

export default class ColorWheel extends Component<Props, State> {
  public static defaultProps = {
    size: 250,
    lightness: 100,
    generateCanvas(size: number) {
      const canvas = document.createElement('canvas')
      canvas.width = size * 2
      canvas.height = size * 2
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      context.scale(2, 2)
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
        gradient.addColorStop(0.45, 'hsl(' + angle + ', 100%, 100%)')
        gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 50%)')

        context.fillStyle = gradient
        context.fill()
      }
      return canvas
    },
  }

  public canvas?: HTMLCanvasElement
  public backgroundUrl?: string
  public state = {
    lightness: this.props.lightness,
    hue: this.props.hue,
    color: Color.hsl(this.props.hue, 100, this.props.lightness).hex(),
    dragging: false,
  }

  private wrapperRef = React.createRef<AnyStyledComponent>()
  private rotatorRef = React.createRef<AnyStyledComponent>()
  private rotator?: any

  public componentWillMount() {
    this.canvas = (this.props.generateCanvas as CanvasGenerator)(this.props.size as number)
    this.backgroundUrl = this.canvas.toDataURL('image/png', 1)
  }

  public componentDidMount() {
    this.rotator = new Rotator(this.rotatorRef.current, {
      angle: this.state.hue - 180, // initial angle
      onRotate: (hue: number) => this.setColor({ hue: hue + 180 }),
      onDragStart: () => this.setState({ dragging: true }),
      onDragStop: () => this.setState({ dragging: false }),
    })
  }

  public render() {
    return (
      <Wrapper
        ref={this.wrapperRef}
        size={this.props.size as number}
        className={this.props.className}
      >
        <BackgroundHelper
          backgroundUrl={this.backgroundUrl as string}
          rotation={this.state.hue - 180}
        />
        <Rotate ref={this.rotatorRef} />
        <Lightness
          size={(this.props.size as number) * 0.3}
          onChange={value => this.setColor({ lightness: 50 + (50 / 100 * value) })}
          value={(100 / 50 * (this.state.lightness - 50))}
          color={this.state.color || '#fff'}
          onDraggingChange={dragging => this.setState({ dragging })}
        />
        <ChildWrapper
          color={this.state.color}
          dragging={this.state.dragging}
          onClick={event => {
            event.stopPropagation()
            this.props.onClose()
          }}
        />
      </Wrapper>
    )
  }

  private setColor(col: { hue?: number, lightness?: number }) {
    const { hue, lightness } = this.state
    const values = { hue, lightness, ...col }
    const color = Color.hsl(values.hue, 100, values.lightness).hex()
    this.props.onChange(values.hue, 100, values.lightness)
    // @ts-ignore
    this.setState({ ...col, color })
  }
}
