import { useParams, useLocation } from "react-router-dom";

import PostList from "../components/PostList/PostList";

function Board() {
  const params = useParams();
  const location = useLocation();
  const { boardIdx } = params;
  const {title, parent: parentBoardIdx} = location.state;

  return (
    <>
      <h2 className="mb20">{title}</h2>
      <PostList boardIdx={boardIdx} parentBoardIdx={parentBoardIdx} />
    </>
  );
}

export default Board;
