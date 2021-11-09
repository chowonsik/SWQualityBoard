import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // 히스토리 모드 제거
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Team from "./pages/Team";

import System from "./pages/System";
import { useEffect, useState } from "react";
import TeamTable from "./pages/TeamTable";
function App() {
  const [sidebarOpened, setSidebarOpened] = useState(true);
  function toggleSidebar() {
    setSidebarOpened(!sidebarOpened);
  }

  return (
    <div className="App">
      <Header toggleSidebar={toggleSidebar} />
      <Router>
        <Sidebar sidebarOpened={sidebarOpened} />
        <Center sidebarOpened={sidebarOpened}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/team/table" exact={true} component={TeamTable} />
            <Route path="/team/:id" exact={true} component={Team} />
            <Route path="/system" exact={true} component={System} />
          </Switch>
        </Center>
      </Router>
    </div>
  );
}

const Center = styled.div`
  position: absolute;
  top: 65px;
  left: ${(props) => (props.sidebarOpened ? "200px" : 0)};
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.sidebarOpened ? "calc(100% - 200px)" : "100%")};
  transition: all ease 0.3s;
`;

export default App;
