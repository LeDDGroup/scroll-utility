import * as React from "react"
import { Grid } from "./Grid"
import { data } from "./data"
import { mapData } from "./Section"

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
    return (
      <Grid fixed>
        <Grid>
          <Grid inverted type="screen">
            <Grid inverted type="position">
              {data.map((d, i) => (
                <React.Fragment key={i}>{mapData(Object.assign(d))}</React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export { App }
