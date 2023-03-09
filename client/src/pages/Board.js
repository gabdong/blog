import { useParams, useLocation } from "react-router-dom";

import PostList from "../components/PostList/PostList";

import { getBoardData } from "../apis/boards";

function Board() {
  const params = useParams();
  const location = useLocation();
  const { boardIdx } = params;
  const { parent: parentBoardIdx } =
    location.state ??
    (async function () {
      await getBoardData(boardIdx);
    })();

  return (
    <>
      <PostList boardIdx={boardIdx} parentBoardIdx={parentBoardIdx} />
    </>
  );
}

export default Board;
