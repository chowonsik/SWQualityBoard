import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // 히스토리 모드 제거
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar />
        <Center>
          <Switch>
            <Route path="/login" exact={true} component={Login} />
          </Switch>
        </Center>
      </Router>
    </div>
  );
}

const Center = styled.div`
  position: absolute;
  top: 65px;
  left: 200px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export default App;
