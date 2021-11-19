import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 65px;
  background-color: ${colors.navy};
  color: ${colors.white};
  font-size: ${fonts.xl};
  font-weight: 700;
  padding-left: 24px;
  z-index: 99;

  .display-logo {
    display: flex;
    justify-content: end;
    flex: 1;
    padding: 20px;
    font-family: "Noto Sans KR";
    @media screen and (max-width: 375px) {
      display: none;
    }
  }
`;

export const Title = styled.div``;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-right: 18px;
  cursor: pointer;
`;
