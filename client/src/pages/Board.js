import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import PostList from "../components/PostList/PostList";

function Board() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { boardIdx } = params;
  const parentBoardIdx = searchParams.get("parent");

  return (
    <>
      <h2 className="mb20">Board</h2>
      <PostList boardIdx={boardIdx} parentBoardIdx={parentBoardIdx} />
    </>
  );
}

export default Board;
