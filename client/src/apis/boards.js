import axios from "../utils/axios";

/**
 * * 게시판 메뉴리스트 요청함수
 */
export async function getBoardList(boardListHandler, loadingHandler = null) {
    try {
        const json = await axios.get("/apis/boards");
        const boardData = json.data;

        boardListHandler(boardData);
        if (loadingHandler) loadingHandler(false);
    } catch (err) {
        throw err;
    }
}