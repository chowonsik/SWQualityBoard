import "./App.css";
import { BrowserRouter as Router } from "react-router-dom"; // 히스토리 모드 제거
import Header from "./components/common/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Router></Router>
    </div>
  );
}

export default App;
