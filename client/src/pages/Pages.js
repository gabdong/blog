import styled from "styled-components";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import Tag from "./Tag.js";
import Settings from "./Settings/Settings.js";
import Post from "./Post.js";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.js";
import PostEditor from "./PostEditor.js";

function Pages() {
  const user = useSelector((state) => state.user);

  return (
    <PagesSt>
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/tag/:tagIdx" element={<Tag />} />
        <Route path="/post/:postIdx" element={<Post />} />
        <Route
          path="/postEditor/:mode"
          element={<PrivateRoute user={user} component={<PostEditor />} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute user={user} component={<Settings />} />}
        />
      </Routes>
    </PagesSt>
  );
}

const PagesSt = styled.div`
  flex: 1;

  max-width: 100%;
  min-width: 0;
`;

export default Pages;
