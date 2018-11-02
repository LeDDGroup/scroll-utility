import * as React from "react"

const maxSize = "30px"
const minSize = "1px"

const T = "top"
const L = "left"
const R = "right"
const B = "bottom"

interface IProps {
  percent: number
  horizontal: boolean
}

function getMap(horizontal: boolean) {
  return function<H, V>(h: H, v: V): H | V {
    return horizontal ? h : v
  }
}

export const percents = Array(10)
  .fill(1)
  .map((x, y) => (x + y) * 10)

export function mapToPercent(horizontal: boolean): JSX.Element[] {
  return percents.map(percent => (
    <PercentMarker key={percent} percent={percent} horizontal={horizontal} />
  ))
}

function getStyle(props: IProps & { inverted?: boolean }): React.CSSProperties {
  const map = getMap(props.horizontal)
  const inverted = getMap(!!props.inverted)
  return {
    [map(L, T)]: `${props.percent}%`,
    [inverted(map(B, R), map(T, L))]: "30px",
    width: map(minSize, maxSize),
    height: map(maxSize, minSize),
  }
}

function getIdStyle(props: IProps): React.CSSProperties {
  const map = getMap(props.horizontal)
  const v1 = "-100%"
  const v2 = "0px"
  return {
    transform: `translate(${map(v1, v2)}, ${map(v2, v1)})`,
  }
}

function getMarker(props: IProps, inverted: boolean) {
  return (
    <div style={getStyle({ ...props, inverted })} className="percent-marker">
      <div style={getIdStyle(props)} className="percent-marker_identifier">
        {props.percent}%
      </div>
    </div>
  )
}

export default class PercentMarker extends React.Component<IProps> {
  render() {
    return <>{getMarker(this.props, false)}</>
  }
}
