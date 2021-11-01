import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom"; // 히스토리 모드 제거
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Sidebar />
        <Center>
          <Switch></Switch>
        </Center>
      </Router>
    </div>
  );
}

const Center = styled.div`
  position: absolute;
  left: 200px;
  display: flex;
  flex-direction: row;
`;

export default App;
