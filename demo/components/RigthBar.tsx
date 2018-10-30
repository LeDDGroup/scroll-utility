import * as React from "react"
import styled, { css } from "styled-components"
import windowScrollManager from "./window-scroll-manager"
import { Colors } from "../colors"

export const Button = styled.button`
  color: ${Colors.primary};
  background: ${Colors.transparent};
  border: solid 3px ${Colors.primary};
  padding: 5px;
  margin-right: 10px;
  border-radius: 3px;
  font-size: 0.9em;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  position: fixed;
  right: 5px;
  width: 30px;
  height: 30px;
  ${(props: { up?: boolean }) =>
    props.up &&
    css`
      bottom: calc(50% + 5px);
    `} ${(props: { up?: boolean }) =>
    !props.up &&
    css`
      top: calc(50% + 5px);
    `};
`

export class RightBar extends React.Component {
  componentDidMount() {
    window.onkeydown = event => {
      if (event.code === "KeyK" || event.code === "KeyJ") {
        windowScrollManager.scrollBy("screen", 0.5 * (event.code === "KeyK" ? -1 : 1))
      }
    }
  }
  render() {
    return (
      <>
        <Button up> k </Button>
        <Button> j </Button>
      </>
    )
  }
}

export default RightBar
