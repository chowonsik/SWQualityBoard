import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  width: 100%;
  height: 100%;
`;
export const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NowValue = styled.p`
  font-size: 1.75rem;
  color: ${(props) =>
    props.isPastShow && props.nowValue - props.pastValue < 0
      ? colors.red
      : colors.black};
`;
export const PastValue = styled.p`
  display: ${(props) => (props.isPastShow ? "block" : "none")};
  font-size: 1.75rem;
`;
