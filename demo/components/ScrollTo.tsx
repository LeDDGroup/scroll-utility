import * as React from "react"
import scrollManager from "./window-scroll-manager"
import UniformScrollElement, { IData } from "./ScrollExample"

const types = ["percent", "screen", "value"]

interface IState extends IData {}

export class ScrollTo extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = {
      select: types[0],
      value: 50,
    }
  }
  render() {
    return (
      <UniformScrollElement
        onClick={this.onClick}
        onChange={this.onChange}
        defaultValue={this.state}
        selectLabel="scroll type"
        selectValues={types}
      />
    )
  }
  private onChange = (data: IData) => {
    this.setState(data)
  }
  private onClick = () => {
    scrollManager.scrollTo(this.state.select as any, this.state.value)
  }
}

export default ScrollTo
