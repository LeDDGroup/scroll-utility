import * as React from "react"
import { UniformComponent } from "uniform-react-components"
import onChange, { toNumber } from "./common"
import styled from "styled-components"

const Row = styled.div``

interface IProps {
  selectLabel: string
  selectValues: string[]
}

export interface IData {
  select: string
  value: number
}

const Div = styled.div`
  margin: 10px;
`

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
      <Div>
        <Row>
          <label> {this.props.selectLabel}: </label>
          <select
            defaultValue={this.props.defaultValue.select}
            onChange={onChange(this.onChange.select)}
          >
            {this.props.selectValues &&
              this.props.selectValues.map((element, i) => <option key={i}>{element}</option>)}
          </select>
        </Row>
        <Row>
          <label> value: </label>
          <input
            type="number"
            defaultValue={this.props.defaultValue.value.toString()}
            onChange={onChange(toNumber(this.onChange.value))}
          />
          <button onClick={this.props.onClick}> Scroll </button>
        </Row>
      </Div>
    )
  }
}

export default UniformScrollElement
