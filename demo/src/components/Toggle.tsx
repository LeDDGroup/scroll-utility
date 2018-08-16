import * as React from "react";

interface IProps {
  checked: boolean;
  toggle: () => void;
  id?: string;
  activeText?: string;
  inactiveText?: string;
}

class Toggle extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return <button onClick={this.props.toggle}>{this.props.checked ? this.props.activeText || "true" : this.props.inactiveText || "false"}</button>;
  }
}

export { Toggle };
