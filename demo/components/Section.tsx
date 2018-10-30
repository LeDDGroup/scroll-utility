import * as React from "react"
import styled, { css } from "styled-components"
import Colors from "../colors"

interface IProps {
  title: string
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

const H1 = styled.h1`
    cursor: pointer
    color: ${Colors.secondary}
`

export class Section extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }
  }
  render() {
    return (
      <section>
        <H1 id={this.props.title} onClick={this.onClick}>
          {this.props.title}
        </H1>
        <IsHidden isVisible={this.state.hidden}>{this.props.children}</IsHidden>
      </section>
    )
  }
  private onClick = () => {
    this.setState({
      hidden: !this.state.hidden,
    })
  }
}

export default Section
