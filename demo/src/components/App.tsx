import * as React from "react";
import "./App.css";
import { ScrollManager } from "./ScrollManager";
import { PositionedElement } from "./PositionedElement";

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div>
        <ScrollManager />
        <PositionedElement id="e1" position={25}>
          Element at 25%
        </PositionedElement>
        <PositionedElement id="e2" position={50}>
          Element at 50%
        </PositionedElement>
        <PositionedElement id="e3" position={75}>
          Element at 75%
        </PositionedElement>
      </div>
    );
  }
}

export { App };
