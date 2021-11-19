import styled from "styled-components";
import { colors } from "../../../styles";
export const Card = styled.div`
  position: relative;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background-color: ${colors.white};
  padding: 0.5rem;
  border-radius: 12px;
  :hover {
    box-shadow: 0 10px 16px 0 rgba(47, 47, 48, 0.3);
  }
  transition: all ease 0.4s;

  filter: drop-shadow(
    0 0 ${(props) => (props.isLight ? 0.5 + "rem" : 0.25 + "rem")}
      ${(props) => (props.isLight ? colors.red : colors.gray)}
  );
`;
