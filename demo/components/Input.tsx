import styled from "styled-components"
import { Colors } from "../data"

export const Input = styled.input`
  color: ${Colors.primary};
  background: ${Colors.transparent};
  border: solid 3px ${Colors.primary};
  padding: 5px;
  margin-right: 10px;
  border-radius: 3px;
  font-size: 0.9em;
  font-weight: bold;
  outline: none;
  cursor: pointer;
`

export default Input
