import * as React from "react"
import styled, { css } from "styled-components"
import { Colors } from "../colors"

interface IntroLayoutProps {
  isHidden?: boolean
  positioned?: boolean
}

const IntroLayout = styled.div`
  min-height: 100vh;
  background: ${Colors.black};
  ${(props: IntroLayoutProps) =>
    props.isHidden &&
    css`
      background: trasparent;
    `} ${(props: IntroLayoutProps) =>
    props.positioned &&
    css`
      width: 100vw;
      top: 0;
      left: 0;
      width: 100%;
      position: absolute;
    `};
`

const H1 = styled.h1`
  color: ${Colors.primary};
`

function Intro() {
  const content = (
    <>
      <H1> scroll-utility </H1>
    </>
  )
  return (
    <>
      <IntroLayout> {content} </IntroLayout>
    </>
  )
}

export default Intro
