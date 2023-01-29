import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

function Board() {
  const params = useParams();

  //TODO 게시판 글 리스트 요청
  useEffect(() => {
    const { boardIdx } = params;
  });

  return (
    <div>
      <h2>Board</h2>
    </div>
  );
}

export default Board;
