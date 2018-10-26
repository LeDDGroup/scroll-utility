import styled, { css } from "styled-components"

interface IProps {
  type: "position" | "percent"
  value: number
  horizontal?: boolean
}

export const PositionedMarker = styled.div`
  position: absolute;
  ${(props: IProps) => css`
    ${props.horizontal ? "left" : "top"}: ${props.value} ${props.type === "percent" ? "%" : "px"};
    ${!props.horizontal ? "left" : "top"}: ${50}%;
    transform: translate(${props.horizontal ? "-100%, -50%" : "-50%, -100%"});
  `};
`

export default PositionedMarker
/* mKGi04cskMg2ywc */
