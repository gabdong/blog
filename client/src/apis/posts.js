import axios from "axios";

/**
 * * 게시글 리스트 요청
 * @param {Number} tagIdx
 * @param {Function} loadingHandler
 */
export async function getPostList(tagIdx) {
  try {
    const json = await axios.get(`/apis/posts/list/${tagIdx}`);

    return json.data.postList;
  } catch (err) {
    throw err;
  }
}

/**
 * * 게시글 요청
 * @param {Number} postIdx
 */
export async function getPost(postIdx) {
  try {
    const json = await axios.get(`/apis/posts/${postIdx}`);

    return json.data.postData;
  } catch (err) {
    throw err;
  }
}
