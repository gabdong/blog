import axios from "axios";

/**
 * * 게시글 리스트 요청
 * @param {Number} boardIdx
 * @param {Number} parentBoardIdx
 * @param {Function} loadingHandler
 */
export async function getPostList(
  boardIdx,
  parentBoardIdx,
  loadingHandler = null
) {
  const parentQuery = parentBoardIdx ? `?parent=${parentBoardIdx}` : "";

  try {
    const json = await axios.get(`/apis/posts/${boardIdx}${parentQuery}`);
    // if (loadingHandler) loadingHandler(false);

    return json;
  } catch (err) {
    throw err;
  }
}
