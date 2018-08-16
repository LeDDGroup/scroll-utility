import * as React from "react";

interface IProps {
  position: number;
  id: string;
}


class PositionedElement extends React.Component<IProps, {}> {
  public render() {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    const position = (this.props.position || 0) / 100 * height;
    const style: React.CSSProperties = {
      position: "absolute",
      top: `${position}px`,
      background: "lightgrey",
      marginLeft: "10%",
      width: "80%",
      height: "50%"
    }
    return (
      <div id={this.props.id} style={style}>
        {this.props.id}
        {this.props.children}
      </div>
    );
  }
}

export { PositionedElement };
