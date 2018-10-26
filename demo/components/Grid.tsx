import * as React from "react"
import styled, { css } from "styled-components"
import PositionedElement, { PositionType } from "./PositionedMarker"

const LEFT_MARGIN = "5%"

const GridContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${(props: IProps) =>
    props.inverted &&
    css`
      flex-direction: row-reverse;
    `};
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

function getPositions(amount: number) {
  return new Array(amount).fill(1).map((v, i) => v + i)
}

function percentValue(value, amount) {
  return (value * 100) / amount
}

function positionValue(value) {
  return value * 500
}

function screenValue(value) {
  return value * 100
}

export interface IProps {
  fixed?: boolean
  type?: PositionType
  inverted?: boolean
}

function getFunction(type: PositionType) {
  return type === "percent" ? percentValue : type === "position" ? positionValue : screenValue
}

function getSign(type: PositionType) {
  return type === "percent" ? "%" : type === "position" ? "px" : "screen"
}

function getId(type: PositionType, value: number, amount) {
  return type === "percent"
    ? percentValue(value, amount)
    : type === "position"
      ? positionValue(value)
      : screenValue(value) / 100
}

export class Grid extends React.Component<IProps> {
  render() {
    const type = this.props.type || "percent"
    const Positions = getPositions(type === "percent" ? 10 : 2)
    const funct: (value, amount) => number = getFunction(type)
    return (
      <GridContainer {...this.props}>
        <Left {...this.props}>
          {Positions.map((v, i) => (
            <PositionedElement
              key={i}
              {...this.props}
              value={funct(v, Positions.length)}
              type={type}
            >
              {getId(type, v, Positions.length)
                .toString()
                .concat(getSign(type))}
            </PositionedElement>
          ))}
        </Left>
        {this.props.fixed && <Left />}
        <Right>{this.props.children}</Right>
      </GridContainer>
    )
  }
}
