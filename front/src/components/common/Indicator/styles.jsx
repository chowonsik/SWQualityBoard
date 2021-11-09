import styled from "styled-components";
import { fonts, colors } from "../../../styles";
export const Wrapper = styled.div`
  position: relative;
  &:hover > div:last-child {
    display: block;
  }
`;

export const Title = styled.div`
  font-size: ${(props) => fonts[props.fontSize] || 14};
  font-weight: ${(props) => (props.isBold ? "bold" : "none")};
  cursor: pointer;
`;

export const IndicatorHelp = styled.div`
  display: none;
  position: absolute;
  width: 250px;
  border-radius: 12px;
  background-color: ${colors.grayLine};
  padding: 0.5rem 1rem;
  z-index: 5;
`;
