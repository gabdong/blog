import axios from "../utils/axios";

/**
 * * 게시판 메뉴리스트 요청
 * @param {Function} boardListHandler
 * @param {Function} loadingHandler
 */
export async function getBoardList(boardListHandler, loadingHandler = null) {
  try {
    const json = await axios.get("/apis/boards");
    const boardData = json.data.boardData;

    boardListHandler(boardData);
    if (loadingHandler) loadingHandler(false);
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
    const boardData = json.data.boardData;

    return boardData;
  } catch (err) {
    throw err;
  }
}

/**
 * * 뎁스1 게시판 리스트 요청
 */
export async function getFirstDepthBoardList() {}

/**
 * * 자식 게시판 리스트 요청
 * @param Number parentBoardIDx
 */
export async function getChildBoardList(parentBoardIdx) {}
