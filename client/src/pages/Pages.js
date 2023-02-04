import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Home from "./Home.js";
import Board from "./Board.js";
import Settings from "./Settings/Settings.js";
import Post from "./Post.js";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.js";
import WritePost from "./WritePost.js";

function Pages() {
  return (
    <PagesSt>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/board/:boardIdx" element={<Board />} />
        <Route path="/post/:postIdx" element={<Post />} />
        <Route
          path="/post/write"
          element={<PrivateRoute component={<WritePost />} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute component={<Settings />} />}
        />
      </Routes>
    </PagesSt>
  );
}

const PagesSt = styled.div`
  flex: 1;
`;

export default Pages;
