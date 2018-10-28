import * as React from "react"
import ReactMarkdown from "react-markdown"
import styled, { css } from "styled-components"
import { Colors } from "../data"

type Data = ISection | IExample | IDoc

function isSection(data: Data): data is ISection {
  return !!(data as ISection).title
}

function isExample(data: Data): data is IExample {
  return !!(data as IExample).code
}

function isDoc(data: Data): data is IDoc {
  return typeof data === "string"
}

interface ISection {
  title: string
  link?: string
  content: Data[]
}

interface IExample {
  description?: string
  code: string
}

type IDoc = string

function mapData(data: Data) {
  if (isSection(data)) {
    return <Section {...data} />
  }
  if (isExample(data)) {
    return Example(data)
  }
  if (isDoc(data)) {
    return Doc(data)
  }
  return <div> Invalid format </div>
}

function Doc(source: IDoc) {
  return <ReactMarkdown source={source} />
}

const VisibleDiv = styled.div`
  overflow: auto;
  ${(props: { isVisible }) =>
    !props.isVisible &&
    css`
      height: 0;
    `};
`

const H1 = styled.h1`
  cursor: pointer;
  color: ${Colors.secondary};
`

class Section extends React.Component<ISection, { visible: boolean }> {
  constructor(props: ISection) {
    super(props)
    this.state = { visible: true }
  }
  render() {
    return (
      <section>
        <H1 onClick={this.toggleVisibility}> {this.props.title} </H1>
        <VisibleDiv isVisible={this.state.visible}>
          {this.props.link && <a href={this.props.link}> </a>}
          {this.props.content.map((data, i) => (
            <React.Fragment key={i}> {mapData(data)} </React.Fragment>
          ))}
        </VisibleDiv>
      </section>
    )
  }
  private toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }
}

function Example(props: IExample) {
  return (
    <>
      {props.description && <p> {props.description} </p>}
      <ReactMarkdown source={props.code} />
    </>
  )
}

export { mapData, Data, ISection, IExample, IDoc }
