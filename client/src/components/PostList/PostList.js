import React, { useEffect, useState } from "react";

import { getPostList } from "../../apis/posts";

function PostList({ boardIdx, parentBoardIdx }) {
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async function () {
      setPostList(await getPostList(boardIdx, parentBoardIdx));
      setLoading(false);
    })();
  }, [boardIdx, parentBoardIdx]);

  return (<>
    {loading ? null : (<section>
      {postList.map((postData) => {
        console.log(postData);
        return true;
      })}
    </section>)}
  </>);
}

export default React.memo(PostList);
