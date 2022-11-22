import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Board from "./Board";

function Pages() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default Pages;
