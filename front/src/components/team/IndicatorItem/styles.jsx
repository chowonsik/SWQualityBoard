import styled from "styled-components";
import { colors } from "../../../styles";

export const Wrapper = styled.dl`
  transition: all ease 0.3s;
  display: flex;
  flex-direction: column;
  :hover {
    opacity: 0.65;
    transition: all ease 0.4s;
  }

  .emoji {
    margin-right: 10px;
    font-size: 36px;
  }
  .green {
    color: ${colors.green};
  }
  .yellow {
    color: ${colors.yellow};
  }
  .red {
    color: ${colors.red};
  }

  .indicator-name {
    order: 2;
  }
  .indicator-value {
    order: 1;
    display: flex;
    justify-content: center;
    line-height: 36px;
    font-size: 28px;
    margin-bottom: 8px;
  }
  cursor: pointer;
`;
