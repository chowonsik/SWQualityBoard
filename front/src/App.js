import React, { useReducer } from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // 히스토리 모드 제거
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Team from "./pages/Team";
import ChartByItem from "./pages/ChartByItem";
import System from "./pages/System";
import { useEffect, useState } from "react";
import TeamTable from "./pages/TeamTable";
import PublicRoute from "./lib/PublicRoute";
import PrivateRoute from "./lib/PrivateRoute";

const initialState = {
  nickName: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_NICKNAME":
      return {
        ...state,
        nickName: action.nickName,
      };
    case "REMOVE_NICKNAME":
      return {
        ...state,
        nickName: "",
      };
    default:
      return {
        ...state,
      };
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (curWidth <= 1200) {
      setSidebarOpened(false);
    }
  }, [curWidth]);
  function toggleSidebar() {
    setSidebarOpened(!sidebarOpened);
  }

  return (
    <div className="App">
      <UserDispatch.Provider value={dispatch}>
        <Header toggleSidebar={toggleSidebar} />
        <Router>
          <Sidebar sidebarOpened={sidebarOpened} nickName={state.nickName} />
          <Center sidebarOpened={sidebarOpened}>
            <Switch>
              <PrivateRoute path="/" exact={true} component={Home} />

              <PublicRoute
                restricted={true}
                path="/login"
                exact={true}
                component={Login}
              />
              <PrivateRoute
                path="/team/table"
                exact={true}
                component={TeamTable}
              />
              <PrivateRoute path="/team" exact={true} component={Team} />
              <PrivateRoute path="/system" exact={true} component={System} />
              <PrivateRoute
                path="/detail/chart/:type"
                exact={true}
                component={ChartByItem}
              />
            </Switch>
          </Center>
        </Router>
      </UserDispatch.Provider>
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
