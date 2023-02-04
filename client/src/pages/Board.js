import { useParams, useLocation } from "react-router-dom";

import PostList from "../components/PostList/PostList";

import { getBoardData } from "../apis/boards";

function Board() {
  const params = useParams();
  const location = useLocation();
  const { boardIdx } = params;
  const { title, parent: parentBoardIdx } =
    location.state ??
    (async function () {
      await getBoardData(boardIdx);
    })();

  return (
    <>
      <h2 className="mb20 subTitle">{title}</h2>
      <PostList boardIdx={boardIdx} parentBoardIdx={parentBoardIdx} />
    </>
  );
}

export default Board;
