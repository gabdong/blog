import { useParams, useSearchParams } from "react-router-dom";

import PostList from "../components/PostList/PostList";

function Board() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { boardIdx } = params;
  const parentBoardIdx = searchParams.get("parent");

  return (
    <div>
      <h2>Board</h2>
      <PostList boardIdx={boardIdx} parentBoardIdx={parentBoardIdx} />
    </div>
  );
}

export default Board;
