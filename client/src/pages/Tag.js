import { useLocation, useParams } from "react-router-dom";

import PostList from "../components/PostList/PostList";

function Tag() {
  const params = useParams();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get("page");

  const { tagIdx } = params;

  return <PostList tagIdx={tagIdx} page={Number(page)} />;
}

export default Tag;
