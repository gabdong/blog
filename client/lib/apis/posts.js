import axios from "axios";

/**
 * * 게시글 리스트 요청
 * @param {Number} tagIdx
 * @param {Number} page
 */
export async function getPostList(tagIdx, page, limit, paginationUsing) {
  try {
    const json = await axios.get(`/apis/posts/list/${tagIdx}`, {
      params: { limit, page, paginationUsing },
    });
    return json.data;
  } catch (err) {
    console.error(err.response.data.msg);
  }
}

/**
 * * 게시글 요청
 * @param {Number} postIdx
 * @param {Boolean} ssr
 */
export async function getPost(postIdx, ssr = false) {
  const path = ssr ? `${process.env.REACT_APP_SERVER_URL}/apis/posts/${postIdx}` : `/apis/posts/${postIdx}`;
  
  try {
    const json = await axios.get(path);
    
    return json.data.postData;
  } catch (err) {
    throw err;
  }
}

/**
 * * 게시글 삭제
 * @param {Number} postIdx
 * @param {Object} router
 */
export async function deletePost(postIdx, router) {
  if (!window.confirm("게시글 삭제를 진행하시겠습니까?")) return;

  try {
    await axios.delete(`/apis/posts/${postIdx}`);

    router.push("/");
  } catch (err) {
    console.error(err.response.data.msg);
  }
}

export async function getAllPosts(ssr = false) {
  const path = ssr ? `${process.env.REACT_APP_SERVER_URL}/apis/posts/list/total` : `/apis/posts/list/total`;

  try {
    const json = await axios.get(path);

    return json.data;
  } catch (err) {
    console.error(err.response.data.msg);
  }
}