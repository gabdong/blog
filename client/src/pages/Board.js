import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getPostList } from "../apis/posts";

function Board() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const { boardIdx } = params;
  const parentBoardIdx = searchParams.get("parent");
  const postList = useMemo(async () => {
    return await getPostList(boardIdx, parentBoardIdx, setLoading);
  });

  return (
    <>
      {loading ? null : (
        <div>
          <h2>Board</h2>
        </div>
      )}
    </>
  );
}

export default Board;
