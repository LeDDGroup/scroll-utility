import * as React from "react"
import styled, { css } from "styled-components"
import PositionedElement, { PositionType } from "./PositionedMarker"
import { ScrollElement } from "./scroll-element"

const positionsPerScreen = 2
const screensPerScreen = 2

const LEFT_MARGIN = "5%"

declare const window: Window & {
  scrollElement: ScrollElement
  windowScrollElement: ScrollElement
}
window.scrollElement = window.windowScrollElement = new ScrollElement(window)

const GridContainer = styled.div`
  display: flex;
  ${(props: IProps) =>
    props.inverted &&
    css`
      flex-direction: row-reverse;
    `};
`

const Left = styled.div`
  position: relative;
  width: ${LEFT_MARGIN};
  ${(props: IProps) =>
    props.fixed &&
    css`
      display: inline-block;
      top: 0;
      height: 100vh;
      position: sticky;
    `};
`

const Right = styled.div`
  width: calc(100% - ${LEFT_MARGIN});
`

function getPositions(type: PositionType) {
  const screenAmount =
    window.scrollElement.scrollSize(false) / window.windowScrollElement.size(false)
  const amount =
    type === "percent"
      ? 10
      : type === "position"
        ? screenAmount * positionsPerScreen
        : screenAmount * screensPerScreen

  const array: number[] = []
  for (let i = 1; i <= amount; i++) {
    array.push(i)
  }
  return array
}

function percentValue(value, amount) {
  return (value * 100) / amount
}

function positionValue(value) {
  return (
    (value * window.windowScrollElement.size(false) - window.windowScrollElement.size(false) / 2) /
    positionsPerScreen
  )
}

function screenValue(value) {
  return (value * 100) / screensPerScreen
}

export interface IProps {
  fixed?: boolean
  type?: PositionType
  inverted?: boolean
  disabled?: boolean
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

interface IState {
  positions: number[]
}

export class Grid extends React.Component<IProps, IState> {
  private get type() {
    return this.props.type || "percent"
  }
  constructor(props: IProps) {
    super(props)
    this.state = {
      positions: getPositions(this.type),
    }
  }
  componentDidMount() {
    const element = document.getElementById("main")
    window.scrollElement = new ScrollElement(element!)
    const funct = () => {
      const positions = getPositions(this.type)
      if (
        positions.length !== this.state.positions.length ||
        positions.some(
          (value, index) =>
            this.funct(value, this.state.positions.length) !==
            this.funct(this.state.positions[index], this.state.positions.length),
        )
      ) {
        this.setState({ positions })
      }
      window.setTimeout(funct, 1000)
    }
    window.setTimeout(funct, 100)
  }
  private get funct() {
    return getFunction(this.type)
  }
  render() {
    const funct = this.funct
    return (
      <GridContainer {...this.props}>
        <Left {...this.props}>
          {!this.props.disabled &&
            this.state.positions.map((v, i) => (
              <PositionedElement
                key={i}
                {...this.props}
                value={funct(v, this.state.positions.length)}
                type={this.type}
                id={getId(this.type, v, this.state.positions.length)
                  .toString()
                  .concat(getSign(this.type))}
              />
            ))}
        </Left>
        <Right>{this.props.children}</Right>
      </GridContainer>
    )
  }
}
