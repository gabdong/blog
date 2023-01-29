import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getPostList } from "../apis/posts";

function Board() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  //TODO 게시판 글 리스트 요청
  useEffect(() => {
    console.log("hi");

    (async function () {
      const parentBoardIdx = searchParams.get("parent");
    })();
  }, [params.boardIdx, searchParams]);

  return (
    <div>
      <h2>Board</h2>
    </div>
  );
}

export default Board;
