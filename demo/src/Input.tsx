import * as React from "react"

// tslint:disable:react-a11y-role-has-required-aria-props

const inputStyle: React.CSSProperties = {
  width: "40px"
}

const selectStyle: React.CSSProperties = {
  width: "100px"
}

type InputType = "select" | "number"
type IProps = ISelectProps | IInputProps

interface IInputProps extends IBasicProps {
  inputType: "number"
  percent: boolean
}

interface ISelectProps extends IBasicProps {
  inputType: "select"
  options: string[]
}

interface IBasicProps {
  name: string
  defaultValue: string
  text: string
  inputType: InputType
  onChange(value: string): void
}

class Input extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <>
      {
        this.props.inputType === "select"
        ? (
          <select style={selectStyle} id={this.props.name} onChange={this.onChange} name={this.props.name} defaultValue={this.props.defaultValue}>
            {this.props.options.map((value: string) => <option key={value} value={value}>{value}</option>)}
          </select>
        )
        :
        <input id={this.props.name} type="number" onChange={this.onChange} name={this.props.name} defaultValue={this.props.defaultValue} style={inputStyle} />
      }
      </>
    )
  }
  private onChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const value = event.target.value
    this.props.onChange(value)
  }
}

export { Input }
