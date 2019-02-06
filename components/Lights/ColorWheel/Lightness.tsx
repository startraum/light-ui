import React, { Component } from 'react'
import styled, { AnyStyledComponent } from 'styled-components'

const handleSize = 40
const Wrapper: AnyStyledComponent = styled.div<{ size: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 2px;
  height: ${p => p.size}px;
  background-color: rgba(64, 64, 64, 0.6);
`
const Handle: AnyStyledComponent = styled.div.attrs<{ color: string , size: number, position: number }>((p: any) => ({
  style: { top: p.position },
}))<{ color: string , size: number, position: number }>`
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  border-radius: 50%;
  border: 3px solid #fff;
  background: ${p => p.color};
  box-shadow: 0px 3px 20px 0 rgba(28, 28, 28, .3);
  box-sizing: border-box;
`

export interface Props {
  size: number
  value: number
  color: string
  onChange: (value: number) => void
  onDraggingChange: (dragging: boolean) => void
}

export default class Lightness extends Component<Props> {
  private wrapperRef = React.createRef<AnyStyledComponent>()
  private isDragging = false

  public render() {
    return (
      <Wrapper
        size={this.props.size}
        ref={this.wrapperRef}
      >
        <Handle
          onTouchStart={this.handleStart}
          onMouseDown={this.handleStart}
          onTouchEnd={this.handleEnd}
          onMouseUp={this.handleEnd}
          value={this.props.value}
          color={this.props.color}
          size={handleSize}
          position={(this.props.size - handleSize) / 100 * ((this.props.value - 100) * -1)}
        />
      </Wrapper>
    )
  }

  private handleStart = () => {
    this.isDragging = true
    this.props.onDraggingChange(true)
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchend', this.handleEnd)
    window.addEventListener('mouseup', this.handleEnd)
  }

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.isDragging) return
    event.preventDefault()
    this.handleMove((event.touches.item(0) as Touch).clientY)
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return
    event.preventDefault()
    this.handleMove(event.clientY)
  }

  private handleMove(eventPosition: number) {
    // @ts-ignore
    const { y: wrapperPosition } = (this.wrapperRef.current as HTMLElement).getBoundingClientRect()
    const height = this.props.size - handleSize
    const position = eventPosition - (wrapperPosition + (handleSize / 2))
    const value = (Math.min(100, Math.max(0, 100 / height * position)) - 100) * -1
    this.props.onChange(value)
  }

  private handleEnd = () => {
    this.isDragging = false
    this.props.onDraggingChange(false)
    window.removeEventListener('touchmove', this.handleTouchMove)
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('touchend', this.handleEnd)
    window.removeEventListener('mouseup', this.handleEnd)
  }
}
