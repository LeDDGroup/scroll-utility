import * as React from "react"
import ReactMarkdown from "react-markdown"

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
    return Section(data)
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

function Section(props: ISection) {
  return (
    <section>
      <h1> {props.title} </h1>
      {props.link && <a href={props.link}> </a>}
      {props.content.map(data => mapData(data))}
    </section>
  )
}

function Example(props: IExample) {
  return (
    <>
      {props.description && <p> {props.description} </p>}
      <pre>
        <code className="language-js">{props.code}</code>
      </pre>
    </>
  )
}

export { mapData, Data, ISection, IExample, IDoc }
