import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Side = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: ${colors.white};
  z-index: -1;
`;

export const Menu = styled.ul`
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 40px 0 50px;
  font-size: ${fonts.sm};
  .username {
    color: ${colors.black};
    font-weight: 700;
  }
  .department {
    color: ${colors.gray};
  }
`;
export const ItemContainer = styled.div`
  li {
    position: relative;
  }
  li::before {
    content: "";
    position: absolute;
    top: 1.7rem;
    width: 0;
    height: 2px;
    background: ${colors.navy};
  }

  &:hover li::before {
    width: 100%;
    transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

export const MenuItem = styled.li`
  margin-bottom: 40px;
  font-size: ${fonts.md};
  :hover {
    color: ${colors.black};
  }
`;
