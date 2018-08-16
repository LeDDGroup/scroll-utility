import * as React from "react";

interface IProps {
  value: number;
  onChange: (value: number) => void;
  id?: string;
}

class Input extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <input id={this.props.id} type="number" onChange={this.onChange} value={this.props.value} />
    );
  }
  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    this.props.onChange(value);
  };
}

export { Input };
