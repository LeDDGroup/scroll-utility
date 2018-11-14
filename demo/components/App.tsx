import * as React from "react"
import { Grid } from "./Grid"
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
    const titles = ["some-element", "some-large-element"]
    return (
      <GridSystem>
        <RightBar />
        <Section title={"CenterElement"}>
          <CenterElement elements={titles} />
        </Section>
        <Section grid title={titles[0]}>
          <div className="content" />
        </Section>
        <Section title={"ScrollTo"}>
          <ScrollTo />
        </Section>
        <Section title={"ScrollBy"}>
          <ScrollBy />
        </Section>
        <Section grid title={titles[1]}>
          <div className="content" />
        </Section>
      </GridSystem>
    )
  }
}

export { App }
