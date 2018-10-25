import * as React from "react"
import { Grid } from "./Grid"
import readme from "../docs/readme.md"
import features from "../docs/features.md"
import ReactMarkdown from "react-markdown"
import windowScrollManager from "./window-scroll-manager"
import CenterElement from "./CenterElement"
import Section from "./Section"
import ScrollBy from "./ScrollBy"
import ScrollTo from "./ScrollTo"
import RightBar from "./RigthBar"

interface IState {
  rulers: boolean
}

class GridSystem extends React.Component<
  {},
  { percentRulers?: boolean; positionRulers?: boolean }
> {
  constructor(props) {
    super(props)
    this.state = {
      percentRulers: true,
      positionRulers: true,
    }
  }
  render() {
    const topbar = (
      <div className="top-bar">
        <button onClick={this.scrollTop}> Scroll Top</button>
      </div>
    )
    return (
      <>
        {topbar}
        <div id="grid">
          <Grid fixed disabled={!this.state.percentRulers}>
            <Grid>
              <Grid inverted type="position">
                <Grid inverted type="screen">
                  <h1 id="intro"> scroll-utility </h1>
                  {this.props.children}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }
  private scrollTop = () => {
    windowScrollManager.centerElement(document.getElementById("grid")!, 0)
  }
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      rulers: true,
    }
  }
  public render(): JSX.Element {
    const titles = ["some-element", "ScrollBy", "ScrollTo", "Readme"]
    return (
      <GridSystem>
        <RightBar />
        <ReactMarkdown source={features} />
        but mainly, precision, and here is the evidence:
        <Section title={"CenterElement"}>
          <CenterElement elements={titles} />
        </Section>
        <Section grid title={titles[0]}>
          <div className="half" />
        </Section>
        <Section title={titles[2]}>
          <ScrollTo />
        </Section>
        <Section title={titles[1]}>
          <ScrollBy />
        </Section>
        more information see readme:
        <Section grid title={titles[3]}>
          <ReactMarkdown source={readme} />
        </Section>
      </GridSystem>
    )
  }
}

export { App }
