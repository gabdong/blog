import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home.js";
import Board from "./Board.js";
import Settings from "./Settings.js";

const PagesSt = styled.div`
  flex: 1;
`;
function Pages() {
  return (
    <PagesSt>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </PagesSt>
  );
}

export default Pages;
