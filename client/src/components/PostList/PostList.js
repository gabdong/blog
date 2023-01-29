import React, { useEffect } from "react";

import { getPostList } from "../../apis/posts";

function PostList({ boardIdx, parentBoardIdx }) {
  const postList = getPostList(boardIdx, parentBoardIdx);

  console.log(postList);
  return <div></div>;
}

export default React.memo(PostList);
