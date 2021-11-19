import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
  background-color: rgba(0, 0, 0, 0.725);
  padding: 0.5rem;
  display: none;
  flex-direction: column;

  border-radius: 12px;
  filter: drop-shadow(
    0 0 0.2rem ${(props) => (props.isLight ? colors.orange : colors.gray)}
  );
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 5rem;
  cursor: pointer;
  &:hover {
    color: ${colors.yellow};
    transform: scale(1.1);
    transition: all ease 0.4s;
  }
`;

export const CloseBtn = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: end;
  margin-right: 1rem;
  font-size: 2rem;
`;
export const MenuTitle = styled.p`
  margin-top: 8px;
  font-size: ${fonts.lg};
`;
