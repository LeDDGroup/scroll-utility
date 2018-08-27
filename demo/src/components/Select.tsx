import * as React from "react";

interface IProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  id?: string;
}

class Select<T extends string> extends React.Component<IProps<T>, {}> {
  public render() {
    return (
      <select id={this.props.id} value={this.props.value} onChange={this.onChange}>
        {this.props.options.map((option: T) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  private onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    this.props.onChange(value as T);
  };
}

export { Select };
