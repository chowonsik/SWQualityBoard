import { List } from "react-bootstrap-icons";
import { Icon, Title, Wrapper } from "./styles";

function Header({ toggleSidebar }) {
  return (
    <Wrapper>
      <Icon onClick={toggleSidebar}>
        <List />
      </Icon>
      <Title>SW 품질지표 대시보드</Title>
    </Wrapper>
  );
}

export default Header;
