import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"

const style: React.CSSProperties = {
  height: "1000vh",
  width: "1000vw",
}

const elementStyle: React.CSSProperties = {
  position: "absolute",
  height: "60vh",
  width: "60vw",
  top: "1000px",
  left: "1000px",
  background: "yellow",
}

const id = "some-id"

ReactDOM.render(
  (
    <App
      identifier="Window scroll"
      getElement={() => null}
      getElementToScroll={() => document.getElementById(id)}
    >
      <div style={elementStyle} id={id}>
        element to scroll to
      </div>
      <div style={style}>
      </div>
    </App>
    ),
  document.getElementById("app"),
)
