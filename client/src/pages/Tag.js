import { useParams } from "react-router-dom";

import PostList from "../components/PostList/PostList";

function Tag() {
  const params = useParams();
  const { tagIdx } = params;

  return <PostList tagIdx={tagIdx} />;
}

export default Tag;
