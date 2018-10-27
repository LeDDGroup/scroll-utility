import * as React from "react"
import { Grid } from "./Grid"
import { data } from "./data"
import { mapData } from "./Section"
import Intro from "./Intro"

interface IState {
  rulers: boolean
}

function GridSystem(props: React.Props<{}> & { background: string }): JSX.Element {
  return (
    <Grid fixed>
      <Grid>
        <Grid inverted type="screen">
          <Grid inverted type="position">
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
        <GridSystem background="white">
          <Intro />
          {data.map((d, i) => (
            <React.Fragment key={i}>{mapData(Object.assign(d))}</React.Fragment>
          ))}
        </GridSystem>
      </main>
    )
  }
}

export { App }
