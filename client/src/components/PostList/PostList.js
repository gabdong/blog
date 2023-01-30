import React, { useEffect } from "react";

import { getPostList } from "../../apis/posts";

function PostList({ boardIdx, parentBoardIdx }) {
  useEffect(() => {
    (async function () {
      const postList = await getPostList(boardIdx, parentBoardIdx);

      console.log(postList);
    })();
  }, [boardIdx, parentBoardIdx]);
  return <div></div>;
}

export default React.memo(PostList);
