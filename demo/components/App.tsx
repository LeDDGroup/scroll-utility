import * as React from "react"
import { Grid } from "./Grid"
import readme from "../docs/readme.md"
import ReactMarkdown from "react-markdown"
import styled from "styled-components"
import Button from "./Button"
import windowScrollManager from "./window-scroll-manager"
import CenterElement from "./CenterElement"
import Section from "./Section"
import ScrollBy from "./ScrollBy"
import ScrollTo from "./ScrollTo"

interface IState {
  rulers: boolean
}

const TopBar = styled.div`
  top: 10px;
  position: fixed;
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
      </TopBar>
    )
    return (
      <>
        {topbar}
        <div id="grid">
          <Grid fixed disabled={!this.state.percentRulers}>
            <Grid>
              <Grid inverted type="position">
                <Grid inverted type="screen">
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
  componentDidMount() {
    window.onkeydown = event => {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        windowScrollManager.scrollBy("screen", 0.5 * (event.code === "ArrowUp" ? -1 : 1))
      }
    }
  }
  public render(): JSX.Element {
    const titles = ["CenterElement", "ScrollBy", "ScrollTo", "Readme"]
    return (
      <GridSystem>
        <Section title={titles[0]}>
          <CenterElement elements={titles} />
        </Section>
        <Section title={titles[1]}>
          <ScrollBy />
        </Section>
        <Section title={titles[2]}>
          <ScrollTo />
        </Section>
        <Section title={titles[3]}>
          <ReactMarkdown source={readme} />
        </Section>
      </GridSystem>
    )
  }
}

export { App }
