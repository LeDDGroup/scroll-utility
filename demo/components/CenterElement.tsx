import * as React from "react"
import scrollManager from "./window-scroll-manager"
import UniformScrollElement, { IData } from "./ScrollExample"

interface IProps {
  elements: string[]
}

interface IState extends IData {}

export class CenterElement extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      select: this.props.elements[0],
      value: 0,
    }
  }
  render() {
    return (
      <UniformScrollElement
        onClick={this.onClick}
        onChange={this.onChange}
        defaultValue={this.state}
        selectLabel="element"
        selectValues={this.props.elements}
      />
    )
  }
  private onChange = (data: IData) => {
    console.log(data)
    this.setState(data)
  }
  private onClick = () => {
    console.log(this.state)
    const element = document.getElementById(this.state.select)
    if (element) {
      scrollManager.centerElement(element, this.state.value)
    } else {
      console.warn(`id ${this.state.select} does not belong to any element`)
    }
  }
}

export default CenterElement
