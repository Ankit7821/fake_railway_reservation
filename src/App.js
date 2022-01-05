import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Login from "./screens/login/Login";
import Registration from "./screens/registration/Registration";
import Home from "./screens/home/Home";
import Reservation from "./screens/reservation/reservation";
import Dashboard from "./screens/dashboard/dashboard";

function App() {
  return (
    <Styled>
      <div className="wrapper">
        <div className="main-content">
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/home" element={<Home />}>
                <Route exact path="/home" element={<Dashboard />} />
                <Route path="/home/reservation" element={<Reservation />} />
                <Route path="/home/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </Styled>
  );
}
const Styled = styled.div`
  .main-content {
    display: flex;
    overflow-x: hidden;
    height: 100vh;
  }

  .wrapper {
    width: 100%;
    height: 100%;
  }
`;
export default App;
