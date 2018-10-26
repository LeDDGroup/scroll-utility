import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./components/App"
import "./assets/prism/prism.css"
import "./assets/prism/prism.js"

const el = document.createElement("div")

el.id = "app"

document.body.appendChild(el)

ReactDOM.render(<App />, el)
