import styled from "styled-components"
import { Colors } from "./data"

export const Button = styled.button`
  color: white;
  background: ${Colors.tertiary};
  border: none;
  padding: 5px;
  margin-right: 10px;
  border-radius: 3px;
  font-size: 0.9em;
  font-weight: bold;
  outline: none;
`

export default Button
