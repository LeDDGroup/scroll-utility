import * as React from "react"
import styled, { css } from "styled-components"
import PositionedElement from "./PositionedMarker"

const LEFT_MARGIN = "5%"

const Line = styled.div`
  background: black;
  ${(props: { horizontal?: boolean }) => css`
    width: ${props.horizontal ? "50px" : "1px"}
    height: ${props.horizontal ? "1px" : "50px"}
`};
`

const GridContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Left = styled.div`
  position: relative;
  display: inline-block;
  width: ${LEFT_MARGIN};
  height: 100%;
  ${(props: IProps) =>
    props.fixed &&
    css`
      position: fixed;
    `};
`

const Right = styled.div`
  position: relative;
  display: inline-block;
  width: calc(100% - ${LEFT_MARGIN});
  /* height: 100%; */
`

const Positions = new Array(10).fill(1).map((v, i) => v + i)

export interface IProps {
  fixed?: boolean
}

export class Grid extends React.Component<IProps> {
  render() {
    return (
      <GridContainer>
        <Left {...this.props}>
          {Positions.map((v, i) => (
            <PositionedElement key={i} type="percent" value={(v * 100) / Positions.length}>
              {" "}
              {(v * 100) / Positions.length}%{" "}
            </PositionedElement>
          ))}
          {Positions.map((v, i) => (
            <PositionedElement key={i} type="percent" value={(v * 100) / Positions.length}>
              {" "}
              <Line horizontal />{" "}
            </PositionedElement>
          ))}
        </Left>
        {this.props.fixed && <Left />}
        <Right>{this.props.children}</Right>
      </GridContainer>
    )
  }
}
