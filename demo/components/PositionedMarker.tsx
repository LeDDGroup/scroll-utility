import * as React from "react"
import styled, { css } from "styled-components"

export type PositionType = "position" | "percent" | "screen"

interface IProps {
  type: PositionType
  value: number
  horizontal?: boolean
  inverted?: boolean
}

const Line = styled.div`
  background: black;
  ${(props: { horizontal?: boolean }) => css`
width: ${props.horizontal ? "100%" : "1px"}
height: ${props.horizontal ? "1px" : "100%"}
`};
`

function getSign(type: PositionType, horizontal?: boolean) {
  return type === "percent" ? "%" : type === "position" ? "px" : horizontal ? "vw" : "vh"
}

/* function getInverted(props): string {
 *     return props.inverted ? `${!props.horizontal ? "right" : "bottom"}`
 *           :`${!props.horizontal ? "left" : "top"}`
 * } */

export const PositionedMarker = styled.div`
  position: absolute;
  ${(props: IProps) => css`
    ${props.horizontal ? "left" : "top"}: ${`${props.value}${getSign(props.type)}`};
    ${!props.horizontal ? "left" : "top"}: 0%;
    ${!props.horizontal ? "width" : "height"}: 100%;
/* ${!props.horizontal ? "min-width" : "min-height"}: 20px; */
    transform: translate(${props.horizontal ? "-100%, 0" : "0, -100%"});
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
          <Line horizontal />
        </PositionedMarker>
      </>
    )
  }
}

export default PositionedElement
/* mKGi04cskMg2ywc */
