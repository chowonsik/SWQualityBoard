import styled from "styled-components";
import { fonts, colors } from "../../../styles";
export const Wrapper = styled.div`
  position: relative;

  &:hover > div:last-child {
    display: block;
  }
`;

export const Title = styled.div`
  font-size: ${(props) => fonts[props.fontSize]};
  font-weight: ${(props) => (props.isBold ? "bold" : "500")};
  cursor: pointer;
`;

export const IndicatorHelp = styled.div`
  position: absolute;
  display: none;
  top: 2rem;
  width: ${(props) => (props.width ? props.width + "px" : "none")};
  border-radius: 12px;
  background-color: ${colors.grayLine};
  padding: 0.5rem 1rem;
  z-index: 5;
`;
