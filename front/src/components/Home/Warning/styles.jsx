import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: relative;
  display: ${(props) => (props.isLight ? "block" : "none")};
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  &:hover > div:last-child {
    display: block;
  }
  #warn-icon {
    color: ${colors.red};
    font-size: ${fonts.md};
  }
`;

export const WarnMessage = styled.div`
  position: absolute;
  display: none;
  top: 1rem;
  width: 200px;
  border-radius: 12px;
  background-color: ${colors.grayLine};
  padding: 0.5rem 1rem;
  z-index: 5;
`;
