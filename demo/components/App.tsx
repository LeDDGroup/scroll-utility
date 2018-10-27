import * as React from "react"
import { Grid } from "./Grid"
import { data } from "./data"
import { mapData } from "./Section"
import Intro from "./Intro"
import styled from "styled-components"

interface IState {
  rulers: boolean
}

const Main = styled.div`
  min-height: 100vh;
`

function GridSystem(props: React.Props<{}>): JSX.Element {
  return (
    <Grid fixed>
      <Grid>
        <Grid inverted type="position">
          <Grid inverted type="screen">
            {props.children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
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
