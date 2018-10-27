import * as React from "react"
import styled, { css } from "styled-components"

export type PositionType = "position" | "percent" | "screen"

interface IProps {
  type: PositionType
  value: number
  inverted?: boolean
}

const Line = styled.div`
  background: black;
  width: 1px;
  height: 100%;
`

function getSign(type: PositionType, horizontal?: boolean) {
  return type === "percent" ? "%" : type === "position" ? "px" : horizontal ? "vw" : "vh"
}

export const PositionedMarker = styled.div`
  position: absolute;
  ${(props: IProps) => css`
    top: ${`${props.value}${getSign(props.type)}`};
    left: 0;
    width: 100%;
    transform: translateY(-100%);
    white-space: nowrap;
    overflow: hidden;
  `};
`

export class PositionedElement extends React.Component<IProps> {
  render() {
    return (
      <>
        <PositionedMarker {...this.props}>{this.props.children}</PositionedMarker>
        <PositionedMarker {...this.props}>
          <Line />
        </PositionedMarker>
      </>
    )
  }
}

export default PositionedElement
