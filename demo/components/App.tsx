import * as React from "react"
import { Grid } from "./Grid"
import { data } from "../data"
import { mapData } from "./Section"
import Intro from "./Intro"
import styled from "styled-components"
import Button from "./Button"
import windowScrollManager from "./window-scroll-manager"
import CenterElement from "./CenterElement"

interface IState {
  rulers: boolean
}

const Main = styled.div`
  min-height: 100vh;
`

const TopBar = styled.div`
  top: 5px;
  position: sticky;
  z-index: 5;
  margin-left: 5px;
  margin-right: 5px;
`

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
      <TopBar>
        <Button onClick={this.scrollTop}> Scroll Top</Button>
        <Button onClick={this.togglePercent}>
          {this.state.percentRulers ? "Hide" : "Show"} percent rulers
        </Button>
        <Button onClick={this.togglePosition}>
          {this.state.positionRulers ? "Hide" : "Show"} position rulers
        </Button>
      </TopBar>
    )
    return (
      <>
        {topbar}
        <div id="grid">
          <Grid fixed disabled={!this.state.percentRulers}>
            <Grid disabled={!this.state.percentRulers}>
              <Grid disabled={!this.state.positionRulers} inverted type="position">
                <Grid disabled={!this.state.positionRulers} inverted type="screen">
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
    windowScrollManager.centerElement(document.getElementById("grid")!, { value: 0 })
  }
  private togglePercent = () => {
    this.setState({
      percentRulers: !this.state.percentRulers,
    })
  }
  private togglePosition = () => {
    this.setState({
      positionRulers: !this.state.positionRulers,
    })
  }
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      rulers: true,
    }
  }
  componentDidMount() {
    window.onkeydown = event => {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        windowScrollManager.scrollBy("screen", {
          value: event.code === "ArrowUp" ? -0.5 : 0.5,
        })
      }
    }
  }
  public render(): JSX.Element {
    const titles = ["Basic usage", "Installation", "Usage", "Support"]
    return (
      <main>
        <Intro />
        <GridSystem>
          <Main id="main">
            <CenterElement elements={titles} />
            {data.map((d, i) => (
              <React.Fragment key={i}>{mapData(d)}</React.Fragment>
            ))}
          </Main>
        </GridSystem>
      </main>
    )
  }
}

export { App }
