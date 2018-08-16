import * as React from "react";
import { Scroll } from "scroll-utility";
import { Select } from "./Select";
import { Toggle } from "./Toggle";
import { ScrollType, ElementToScroll } from "../utils/types";
import { ObjectValues } from "../utils/object-values";
import { Input } from "./Input";
import { Row } from "./Row";

declare const window: Window & {
  Scroll: typeof Scroll;
  WindowScrollManager: Scroll;
};

const defaultState: IState = {
  scrollType: ScrollType.offset,
  value: 100,
  element: ElementToScroll.e1,
  duration: 0,
  horizontal: false,
  showCode: false,
};

interface IState {
  scrollType: ScrollType;
  value: number;
  element: ElementToScroll;
  duration: number;
  horizontal: boolean;
  showCode: boolean;
}

class ScrollManager extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = defaultState;
  }
  public componentDidMount() {
    window.Scroll = Scroll;
    window.WindowScrollManager = new Scroll();
  }
  public render(): JSX.Element {
    return (
      <div className="scroll-manager">
        {this.scrollParametersSection}
        {this.buttons}
        {this.state.showCode && this.codeSection}
      </div>
    );
  }
  private get buttons() {
    return (
      <>
        <Row>
        <Toggle
          checked={this.state.showCode}
          activeText="Hide code"
          inactiveText="Show code"
          toggle={() => this.setState({ showCode: !this.state.showCode })}
        />
        <button onClick={this.scroll}> Scroll! </button>
        </Row>
      </>
    );
  }
  private get codeSection() {
    const code = this.getCodeString();
    return (
      <>
        <hr />
        <Row> in the browser's console:</Row>
        <Row>
          <textarea readOnly rows={6} cols={40} id="ctc" value={code} />
        </Row>
        <Row>
          <button onClick={this.copyToClipboard}> Copy to Clipboard </button>
        </Row>
      </>
    );
  }
  private get scrollParametersSection() {
    const valueText =
      this.state.scrollType === ScrollType.element || this.state.scrollType === ScrollType.percent
        ? "center"
        : "distance";

    return (
      <>
        <Row>
          <label htmlFor="type"> scroll type </label>
          <Select<ScrollType>
            id="type"
            options={ObjectValues(ScrollType)}
            value={this.state.scrollType}
            onChange={this.onTypeChange}
          />
        </Row>
        {this.state.scrollType === ScrollType.element && (
          <Row>
            <label htmlFor="element"> element to scroll </label>
            <Select<ElementToScroll>
              id="element"
              options={ObjectValues(ElementToScroll)}
              value={this.state.element}
              onChange={this.onElementChange}
            />
          </Row>
        )}
        <Row>
          <label htmlFor="value"> {valueText} </label>
          <Input id="value" onChange={this.onValueChange} value={this.state.value} />
        </Row>
        <Row>
          <label htmlFor="duration"> duration(ms) </label>
          <Input id="duration" onChange={this.onDurationChange} value={this.state.duration} />
        </Row>
        {
          <Row>
            <label htmlFor="horizontal"> horizontal </label>
            <Toggle
              id="horizontal"
              checked={this.state.horizontal}
              toggle={() => this.setState({ horizontal: !this.state.horizontal })}
            />
          </Row>
        }
        <div />
      </>
    );
  }
  private getCodeString() {
    const value =
      this.state.scrollType === ScrollType.element
        ? `document.getElementById("${this.state.element}")`
        : this.state.value;
    const durationCondition = this.state.duration !== 0;
    const duration = durationCondition ? `  duration: ${this.state.duration}, \n` : "";
    const horizontalCondition = this.state.horizontal;
    const horizontal = horizontalCondition ? `  horizontal: ${this.state.horizontal}, \n` : "";
    const centerCondition = this.state.scrollType === ScrollType.element && this.state.value !== 0;
    const center = centerCondition ? `  center: ${this.state.value}, \n` : "";
    const optionsCondition = durationCondition || horizontalCondition || centerCondition;
    const options = optionsCondition ? `, {\n${duration}${horizontal}${center}}` : "";
    const code = `new Scroll().scroll.${this.state.scrollType}(${value}${options})`;
    return code;
  }
  private onTypeChange = (scrollType: ScrollType) => {
    this.setState({ scrollType });
  };
  private onValueChange = (value: number) => {
    this.setState({ value });
  };
  private onDurationChange = (duration: number) => {
    this.setState({ duration });
  };
  private onElementChange = (element: ElementToScroll) => {
    this.setState({ element });
  };
  private copyToClipboard = () => {
    const copyText = document.getElementById("ctc") as HTMLTextAreaElement;
    copyText!.select();
    document.execCommand("copy");
  };
  private scroll = () => {
    const options = {
      duration: this.state.duration,
      horizontal: this.state.horizontal,
      center: this.state.value,
    };
    switch (this.state.scrollType) {
      case ScrollType.element:
        window.WindowScrollManager.scroll.toElement(
          document.getElementById(this.state.element),
          options,
        );
        return;
      case ScrollType.position:
        window.WindowScrollManager.scroll.toPosition(this.state.value, options);
        return;
      case ScrollType.percent:
        window.WindowScrollManager.scroll.toPercent(this.state.value, options);
        return;
      case ScrollType.offset:
        window.WindowScrollManager.scroll.offset(this.state.value, options);
        return;
      default:
        return;
    }
  };
}

export { ScrollManager };
