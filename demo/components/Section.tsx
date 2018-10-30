import * as React from "react"
import styled, { css } from "styled-components"
import { Grid } from "./Grid"

interface IProps {
  title: string
  grid?: boolean
}

interface IState {
  hidden: boolean
}

const IsHidden = styled.div`
  ${(props: { isVisible: boolean }) =>
    props.isVisible &&
    css`
      display: none;
    `};
`

const SectionElement = styled.section`
  border: solid 1px black;
  margin: 10px;
`

export class Section extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }
  }
  render() {
    const content = (
      <>
        <h1>{this.props.title}</h1>
        <IsHidden isVisible={this.state.hidden}>{this.props.children}</IsHidden>
      </>
    )
    return (
      <SectionElement id={this.props.title}>
        {this.props.grid && <Grid> {content} </Grid>}
        {!this.props.grid && content}
      </SectionElement>
    )
  }
}

export default Section
