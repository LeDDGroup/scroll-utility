import * as React from "react"
import { Grid } from "./Grid"
import { data } from "../data"
import { mapData } from "./Section"
import Intro from "./Intro"
import styled from "styled-components"
import Button from "./Button"

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
  constructor() {
    super({})
    this.state = {
      percentRulers: true,
      positionRulers: true,
    }
  }
  render() {
    return (
      <>
        <div id="grid">
          <Grid fixed disabled={!this.state.percentRulers}>
            <Grid disabled={!this.state.percentRulers}>
              <Grid disabled={!this.state.positionRulers} inverted type="position">
                <Grid disabled={!this.state.positionRulers} inverted type="screen">
                  <TopBar>
                    <Button onClick={this.scrollTop}> Scroll Top</Button>
                    <Button onClick={this.togglePercent}>
                      {" "}
                      {this.state.percentRulers ? "Hide" : "Show"} percent rulers{" "}
                    </Button>
                    <Button onClick={this.togglePosition}>
                      {" "}
                      {this.state.positionRulers ? "Hide" : "Show"} position rulers{" "}
                    </Button>
                  </TopBar>
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
    new ScrollUtility().centerElement(document.getElementById("grid")!, { value: 0 })
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
  public render(): JSX.Element {
    return (
      <main>
        <Intro />
        <GridSystem>
          <Main id="main">
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
