import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Side = styled.div`
  position: fixed;
  top: 65px;
  left: ${(props) => (props.sidebarOpened ? 0 : "-200px")};
  bottom: 0;
  width: 200px;
  background-color: ${colors.white};
  z-index: 50;
  transition: all ease 0.3s;
`;

export const Menu = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Profile = styled.div`
  width: 100%;
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
  :hover {
    background-color: ${colors.grayLine};
    color: ${colors.navy};
  }
  transition: all ease 0.3s;

  padding: 20px;
  margin-bottom: 10px;
`;

export const MenuItem = styled.li`
  gap: 10px;
  font-size: ${fonts.md};
`;
export const NickName = styled.p`
  color: ${colors.black};
  font-size: ${fonts.md};
  font-weight: bold;
  width: 100%;
`;

export const LoginButton = styled.p`
  color: ${colors.navy};
  font-size: ${fonts.sm};
  cursor: pointer;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;

export const LogoutButton = styled.div`
  :hover {
    color: ${colors.navy};
  }
  color: ${colors.gray};
  font-size: ${fonts.md};
  cursor: pointer;
  width: 100%;
  margin-bottom: 2rem;
`;
