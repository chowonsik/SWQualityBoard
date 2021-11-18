import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  height: 70%;
`;

export const ValueBox = styled.div`
  color: ${colors.black};
  margin-top: 0.5rem;
`;

export const Category = styled.p`
  color: ${(props) => props.fontColor || "black"};
  font-weight: 700;
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

export const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const NowValue = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;

  color: ${(props) =>
    props.isPastShow &&
    props.dataType === "defect" &&
    props.nowValue - props.pastValue > 0
      ? colors.red
      : colors.black};
`;

export const PastValue = styled.p`
  display: ${(props) => (props.isPastShow ? "block" : "none")};
  font-size: 1rem;
`;
