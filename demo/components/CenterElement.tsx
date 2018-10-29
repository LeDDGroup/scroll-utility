import * as React from "react"
import scrollManager from "./window-scroll-manager"

interface IProps {
  elements?: string[]
}

interface IState {
  elementToScrollTo: string
  value: number
}

export class CenterElement extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    console.log((props.elements && props.elements[0]) || "none")
    this.state = {
      elementToScrollTo: (props.elements && props.elements[0]) || "none",
      value: 50,
    }
  }
  render() {
    return (
      <>
        <section>
          <select
            defaultValue={this.state.elementToScrollTo}
            onChange={this.onElementToScrollToChange}
          >
            {this.props.elements &&
              this.props.elements.map((element, i) => <option key={i}>{element}</option>)}
          </select>
          <input
            type="number"
            defaultValue={this.state.value.toString()}
            onChange={this.onValueChange}
          />
          <button onClick={this.onClick}> Scroll </button>
        </section>
      </>
    )
  }
  private onClick = () => {
    const element = document.getElementById(this.state.elementToScrollTo)
    console.log(element)
    const value = this.state.value
    scrollManager.centerElement(element!, {
      value,
    })
  }
  private onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    this.setState({
      value,
    })
  }
  private onElementToScrollToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const elementToScrollTo = event.target.value
    this.setState({
      elementToScrollTo,
    })
  }
}

export default CenterElement
