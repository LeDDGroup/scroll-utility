import * as React from "react"
import { UniformComponent } from "uniform-react-components"
import onChange, { toNumber } from "./common"
import styled from "styled-components"

const Fieldset = styled.fieldset`
  min-height: 50vh;
`

interface IProps {
  selectLabel: string
  selectValues: string[]
}

export interface IData {
  select: string
  value: number
}

export class UniformScrollElement extends UniformComponent<
  IData,
  IProps & { onClick: () => void }
> {
  constructor(props) {
    super(props)
    this.state = {
      elementToScrollTo: (props.elements && props.elements[0]) || "none",
      value: 50,
    }
  }
  render() {
    return (
      <Fieldset>
        <label> {this.props.selectLabel}: </label>
        <select
          defaultValue={this.props.defaultValue.select}
          onChange={onChange(this.onChange.select)}
        >
          {this.props.selectValues &&
            this.props.selectValues.map((element, i) => <option key={i}>{element}</option>)}
        </select>
        <label> value: </label>
        <input
          type="number"
          defaultValue={this.props.defaultValue.value.toString()}
          onChange={onChange(toNumber(this.onChange.value))}
        />
        <button onClick={this.props.onClick}> Scroll </button>
      </Fieldset>
    )
  }
}

export default UniformScrollElement
