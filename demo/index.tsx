import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./components/App"

const el = document.createElement("div")

el.id = "app"

document.body.appendChild(el)

ReactDOM.render(<App />, el)
