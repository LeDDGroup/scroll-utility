import * as React from "react"
import Section from "./Section"
import { scenarios } from "./data"
import "./App.css"
import { mapToPercent } from "./PercentMarker"
import scrollManager from "./window-scroll-manager"

interface IState {
  rulers: boolean
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      rulers: true,
    }
  }
  public render(): JSX.Element {
    const rulers = this.state.rulers
    return (
      <>
        <div className="app">
          {scenarios.map((s, i) => (
            <section key={i}>
              <h2> {s.description} </h2>
              <ul>
                {s.scenarios.map((d, index) => (
                  <li key={index}>
                    {" "}
                    <Section {...d} />{" "}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <button
            className="scroll-top"
            onClick={() => this.setState({ rulers: !this.state.rulers })}
          >
            {rulers ? "Hide rulers " : "Show rulers"}
          </button>
          <button
            className="scroll-top"
            onClick={() => {
              scrollManager.stopAllAnimations()
              scrollManager.scrollTo("percent", { value: 0, duration: 1000 })
            }}
          >
            {" "}
            Scroll to top
          </button>
          <div className="container">
            <div id="some-element">
              #some-element
              {rulers && <div className="grid"> {mapToPercent(false)} </div>}
            </div>
          </div>
          {rulers && <div className="grid"> {mapToPercent(false)} </div>}
        </div>
        {rulers && <div className="grid"> {mapToPercent(false)} </div>}
      </>
    )
  }
}

export { App }
