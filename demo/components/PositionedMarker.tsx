import styled, { css } from "styled-components"

interface IProps {
  type: "position" | "percent"
  value: number
  horizontal?: boolean
}

export const PositionedMarker = styled.div`
  position: absolute;
  ${(props: IProps) => css`
    ${props.horizontal ? "left" : "top"}: ${`${props.value}${
      props.type === "percent" ? "%" : "px"
    }`};
    ${!props.horizontal ? "left" : "top"}: 0;
    ${!props.horizontal ? "width" : "height"}: 100%;
    ${!props.horizontal ? "min-width" : "min-height"}: 20px;
    transform: translate(${props.horizontal ? "-100%, -0%" : "-0%, -100%"});
  `};
`

export default PositionedMarker
/* mKGi04cskMg2ywc */
