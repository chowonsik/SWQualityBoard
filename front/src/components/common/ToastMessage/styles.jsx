import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  top: ${(props) => (props.isActive ? 10 + "rem" : -70 + "px")};
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  width: 100vw;
  display: flex;
  z-index: 999;
  justify-content: center;
  transition: all 0.5s;
`;

export const Message = styled.div`
  padding: 15px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212123;
  color: #bebebf;
  color: ${colors.white};
  border-radius: 4px;
  width: 30vw;
  word-break: break-all;
  font-size: ${fonts.md};
  font-weight: 200;
`;
