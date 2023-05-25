import axios from "axios";

/**
 * * 게시글 리스트 요청
 * @param {Number} tagIdx
 * @param {Number} page
 */
export async function getPostList(tagIdx, page, limit, paginationUsing) {
  try {
    const json = await axios.get(`/apis/posts/list/${tagIdx}`, {
      params: { limit, page, paginationUsing }
    });
    return json.data;
  } catch (err) {
    console.error(err.response.data.msg);
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
