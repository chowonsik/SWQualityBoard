import { useContext } from "react";
import { useHistory } from "react-router";
import { UserDispatch } from "../../../App";
import {
  Side,
  MenuItem,
  Profile,
  Menu,
  ItemContainer,
  NickName,
  LoginButton,
  LogoutButton,
} from "./styles";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpened, nickName }) {
  const history = useHistory();
  const dispatch = useContext(UserDispatch);

  const menus = [
    {
      name: "품질 지표 현황",
      path: "/",
      role: ["ROLE_EXECUTIVE"],
    },
    {
      name: "팀 관리",
      path: "/team",
      role: ["ROLE_ADMIN", "ROLE_DEVELOPER", "ROLE_EXECUTIVE"],
    },
    {
      name: "팀 테이블",
      path: "/team/table",
      role: ["ROLE_ADMIN", "ROLE_DEVELOPER", "ROLE_EXECUTIVE"],
    },
    {
      name: "시스템 관리",
      path: "/system",
      role: ["ROLE_ADMIN", "ROLE_DEVELOPER", "ROLE_EXECUTIVE"],
    },
  ];

  function handleClickLogin() {
    history.push("/login");
  }

  function handleClickLogout() {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("token");
    dispatch({ type: "REMOVE_NICKNAME" });
    sessionStorage.clear();
    history.push("/login");
  }
  return (
    <Side sidebarOpened={sidebarOpened}>
      <Menu>
        <div>
          <Profile>
            {nickName || localStorage.getItem("loginUser") ? (
              <NickName>
                {nickName ||
                  JSON.parse(localStorage.getItem("loginUser"))["nickname"]}
              </NickName>
            ) : (
              <LoginButton onClick={handleClickLogin}>
                로그인이 필요합니다.
              </LoginButton>
            )}
          </Profile>
          {menus.map((menu, index) => {
            return (
              localStorage.getItem("loginUser") &&
              menu.role.includes(
                JSON.parse(localStorage.getItem("loginUser"))["authorities"][0][
                  "role"
                ]
              ) && (
                <NavLink
                  exact
                  style={{ color: "gray" }}
                  to={menu.path}
                  key={index}
                  activeStyle={{ color: "navy", fontWeight: 700 }}
                >
                  <ItemContainer>
                    <MenuItem>{menu.name}</MenuItem>
                  </ItemContainer>
                </NavLink>
              )
            );
          })}
        </div>
        <div>
          {nickName || localStorage.getItem("loginUser") ? (
            <LogoutButton onClick={handleClickLogout}>로그아웃</LogoutButton>
          ) : (
            ""
          )}
        </div>
      </Menu>
    </Side>
  );
}

export default Sidebar;
