import * as React from "react"

export interface IProps {
  description: string
  script: () => void
  code: string
}

interface IState {
  active: boolean
}

function code(c: string) {
  return (
    <textarea cols={60} rows={4}>
      {c}
    </textarea>
  )
}

export default class Section extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      active: false,
    }
  }
  public render(): JSX.Element {
    const active = this.state.active
    return (
      <div>
        <label> {this.props.description} </label>
        <button onClick={() => this.props.script()}> Scroll! </button>
        <button onClick={this.toggleCode}> {active ? "Hide code" : "Show Code"} </button>
        {active && code(this.props.code)}
      </div>
    )
  }
  private toggleCode = () => {
    this.setState({
      active: !this.state.active,
    })
  }
}
