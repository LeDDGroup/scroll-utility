import * as React from "react";

class Row extends React.Component {
  public render() {
    const count = React.Children.count(this.props.children);
    const x = 100 / count;
    const paddingLeft = x / 10
    const width =  x - paddingLeft * 2;
    const style: React.CSSProperties = {
      display: "inline-block",
      width: `${width}%`,
      paddingLeft: `${paddingLeft}%`,
      paddingRight: `${paddingLeft}%`,
    }
    return (
      <div className="row">
        {
          React.Children.map(this.props.children, (children) => {
            return (
              <div style={style}>{children}</div>
            )
          })
        }
      </div>
    )
  }
}

export { Row };
