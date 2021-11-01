import { Side, MenuItem, Profile, Menu, ItemContainer } from "./styles";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menus = [
    { name: "품질 지표 현황", path: "/" },
    { name: "팀 관리", path: "/team" },
    { name: "시스템 관리", path: "/system" },
  ];
  return (
    <Side>
      <Menu>
        <Profile>
          <span className="username">김민환</span>
          <span className="department">시스템 사업부</span>
        </Profile>
        {menus.map((menu, index) => {
          return (
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
          );
        })}
      </Menu>
    </Side>
  );
}

export default Sidebar;
