import * as React from "react"
import { Scroll } from "../../"
import { IState, ScrollManager } from "./ScrollManager"

const style: React.CSSProperties = {
  display: "inline-block",
  position: "fixed",
  top: "0",
  left: "10vw",
  width: "80vw",
  margin: "0",
  zIndex: 5,
}
const divStyle: React.CSSProperties = {
  border: "1px solid",
  padding: "5px",
  background: "grey",
}

interface IProps {
  identifier: string
  getElement(): HTMLElement | null
  getElementToScroll(): HTMLElement | null
}

class App extends React.Component<IProps, {}> {
  private scrollManager: Scroll | undefined
  public componentDidMount(): void {
    this.scrollManager = new Scroll(this.props.getElement() || undefined)
  }
  public render(): JSX.Element {
    return (
      <>
        <div style={style}>
          {this.props.identifier}
          <div style={divStyle}>
            <ScrollManager scroll={this.scroll} />
          </div>
        </div>
        {this.props.children}
      </>
    )
  }
  private get element(): HTMLElement | null {
    return this.props.getElementToScroll() || null
  }
  private scroll = (options: IState) => {
    const value = parseInt(options.value, 10)
    console.log(value)
    const o = {
      center: value,
      duration: parseInt(options.duration, 10),
      horizontal: options.horizontal === "true",
    }
    if (this.scrollManager) {
      switch (options.scrollType) {
        case "scrollToElement":
          if (this.element) {
            this.scrollManager.scroll.toElement(this.element, o)
          } else {
            console.warn("element not specified")
          }
          return
        case "scrollToPercent":
          this.scrollManager.scroll.toPercent(value, o)
          return
        case "scrollToPosition":
          this.scrollManager.scroll.toPosition(value, o)
          return
        default:
          this.scrollManager.scroll.offset(value, o)
      }
    } else {
      console.warn("scrollManager is undefined")
    }
  }
}

export { App }
