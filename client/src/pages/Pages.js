import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home.js";
import Board from "./Board.js";
import Settings from "./Settings/Settings.js";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.js";

function Pages() {
  return (
    <PagesSt>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route
          path="/settings"
          element={<PrivateRoute component={<Settings />}></PrivateRoute>}
        />
      </Routes>
    </PagesSt>
  );
}

const PagesSt = styled.div`
  flex: 1;
`;

export default Pages;
