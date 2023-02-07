import axios from "../utils/axios";

/**
 * * 게시판 메뉴리스트 요청
 */
export async function getBoardList() {
  try {
    const json = await axios.get("/apis/boards");

    return json.data.boardData;
  } catch (err) {
    throw err;
  }
}

/**
 * * 게시판 정보요청
 * @param {Number} boardIdx
 */
export async function getBoardData(boardIdx) {
  try {
    const json = await axios.get(`/apis/boards/${boardIdx}`);

    return json.data.boardData;
  } catch (err) {
    throw err;
  }
}

/**
 * * 뎁스1 게시판 리스트 요청
 */
export async function getFirstDepthBoardList() {
  try {
    const json = await axios.get("/apis/boards/list/firstDepth");

    return json.data.boardData;
  } catch (err) {
    throw err;
  }
}

/**
 * * 자식 게시판 리스트 요청
 * @param Number parentBoardIDx
 */
export async function getChildBoardList(parentBoardIdx) {
  try {
    const json = await axios.get(
      `/apis/boards/list/childBoard/${parentBoardIdx}`
    );

    return json.data.boardData;
  } catch (err) {
    throw err;
  }
}
