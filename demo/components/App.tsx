import * as React from "react"
import { Grid } from "./Grid"
import styled from "styled-components"

interface IState {
  rulers: boolean
}

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 200vh;
`

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
        <Div>
          <Grid>
            <Grid inverted type="screen">
              <Grid inverted type="position" />
            </Grid>
          </Grid>
        </Div>
      </Grid>
    )
  }
}

export { App }
