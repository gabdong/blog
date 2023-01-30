import axios from "axios";

/**
 * * 게시글 리스트 요청
 * @param {Number} boardIdx
 * @param {Number} parentBoardIdx
 * @param {Function} loadingHandler
 */
export async function getPostList(boardIdx, parentBoardIdx) {
  const parentQuery = parentBoardIdx ? `?parent=${parentBoardIdx}` : "";

  try {
    const json = await axios.get(`/apis/posts/${boardIdx}${parentQuery}`);

    return json;
  } catch (err) {
    throw err;
  }
}
