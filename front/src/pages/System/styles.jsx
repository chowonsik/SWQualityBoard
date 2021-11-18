import styled from "styled-components";
import { Card } from "../../components/common/Card/styles";
import { fonts } from "../../styles";

export const Wrapper = styled.div`
  width: 100%;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Selectors = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: ${fonts.xxl};
  position: relative;
  padding: 0 20px;
  @media screen and (max-width: 375px) {
    flex-direction: column;
    font-size: ${fonts.md};
    gap: 20px;
  }
`;

export const SystemSelectorContainer = styled.div`
  display: flex;
  gap: 10px;
  .icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    transform: ${(props) => (props.selectShow ? "rotateX(180deg)" : "")};
    transition: all ease-in 0.1s;
  }
`;
export const DateSelectorContainer = styled.div``;

export const ChartContainer = styled(Card)`
  width: 85%;
  padding: 20px;
  height: 450px;
`;
export const TableContainer = styled(Card)`
  width: 85%;
  height: auto;
`;

export const SystemSelector = styled(Card)`
  position: absolute;
  top: 2.5rem;
  left: 0;
  z-index: 80;
  font-size: ${fonts.md};
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;
  user-select: none;
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
  input {
    margin-right: 10px;
  }
  label {
    cursor: pointer;
  }
`;

export const ChartIndicator = styled.div`
  width: calc((100vw - 200px) * 0.8);
  text-align: start;
  position: relative;
  top: 20px;
  font-size: ${fonts.xl};
`;
