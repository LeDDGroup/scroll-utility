import * as React from "react"
import { Grid } from "./Grid"
import readme from "../docs/readme.md"
import features from "../docs/features.md"
import ReactMarkdown from "react-markdown"
import styled from "styled-components"
import Button from "./Button"
import windowScrollManager from "./window-scroll-manager"
import CenterElement from "./CenterElement"
import Section from "./Section"
import ScrollBy from "./ScrollBy"
import ScrollTo from "./ScrollTo"
import { Colors } from "../colors"
import RightBar from "./RigthBar"

interface IState {
  rulers: boolean
}

const Intro = styled.h1`
  color: ${Colors.primary};
`

const TopBar = styled.div`
  top: 10px;
  position: fixed;
  z-index: 5;
  margin-left: 5px;
  margin-right: 5px;
`

const SomeElement = styled.div`
  height: 50vh;
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
                  <Intro> scroll-utility </Intro>
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
          <SomeElement />
        </Section>
        <Section title={titles[1]}>
          <ScrollBy />
        </Section>
        <Section title={titles[2]}>
          <ScrollTo />
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
