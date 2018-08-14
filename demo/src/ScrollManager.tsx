import * as React from "react"
import { Input } from "./Input"

// tslint:disable:react-a11y-role-has-required-aria-props

type ScrollType = "offset" | "scrollToPosition" | "scrollToPercent" | "scrollToElement"
type Horizontal = "true" | "false"

interface IProps {
  scroll(options: IState): void
}

interface IState {
  scrollType: ScrollType
  value: string
  horizontal: Horizontal
  duration: string
}

class ScrollManager extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      horizontal: "false",
      scrollType: "offset",
      value: "0",
      duration: "0",
    }
  }
  public render(): JSX.Element {
    const percent =
      this.state.scrollType === "scrollToPercent" || this.state.scrollType === "scrollToElement"
    const inputValue = (
      <Input
        name="value"
        defaultValue="0"
        text={percent ? "centered percent: " : "value"}
        onChange={this.onValueChange}
        inputType="number"
        percent={percent}
      />
    )

    return (
      <>

        <code>
          { this.state.scrollType === "scrollToElement" && <> const someElement = document.querySelector("pathToElement") <br /> </>}
          new Scroll().
          <Input
            name="type"
            defaultValue="offset"
            text="Type: "
            onChange={this.onTypeChange}
            inputType="select"
            options={["offset", "scrollToPosition", "scrollToPercent", "scrollToElement"]}
          />
          (
          {this.state.scrollType === "scrollToElement" ? "someElement" : inputValue}
          ,
          {"{"}
          <label htmlFor="duration"> duration: </label>
          <Input
            name="duration"
            defaultValue="0"
            text="Duration"
            onChange={this.onDurationChange}
            inputType="number"
            percent={false}
          />
          , horizontal:
          <Input
            name="direction"
            defaultValue="false"
            text="Direction"
            onChange={this.onDirectionChange}
            inputType="select"
            options={["true", "false"]}
          />
          {this.state.scrollType === "scrollToElement" && (<>, center: {inputValue}, </>)}
          {"}"}
          )
          <button onClick={this.scroll}>Scroll!</button>
        </code>
      </>
    )
  }
  private onTypeChange = (value: string) => {
    const scrollType = value as ScrollType
    this.setState({ scrollType })
  }
  private onValueChange = (value: string) => {
    this.setState({ value })
  }
  private onDirectionChange = (horizontal: Horizontal) => {
    this.setState({ horizontal })
  }
  private onDurationChange = (duration: string) => {
    this.setState({ duration })
  }
  private scroll = () => {
    this.props.scroll(this.state)
  }
}

export { ScrollManager, IState }
