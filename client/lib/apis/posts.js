import axios from "@/lib/utils/axios";
import { uploadImage } from "./images";

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
export async function getPost({ postIdx, user = {} }) {
  try {
    const getPostRes = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/apis/posts/${postIdx}`,
      {
        params: { user },
      }
    );

    return getPostRes.data.postData;
  } catch (err) {
    return { status: err.response.status, msg: err.response.data.msg };
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

/**
 * * 모든 게시글을 불러오는 요청(비공개 게시글포함)
 * @param {Boolean} ssr
 * @returns {Ojbect}
 */
export async function getAllPosts(ssr = false) {
  const path = ssr
    ? `${process.env.REACT_APP_SERVER_URL}/apis/posts/list/all`
    : `/apis/posts/list/all`;

  try {
    const json = await axios.get(path);

    return json.data;
  } catch (err) {
    console.error(err.response.data.msg);
  }
}

/**
 * * 게시글 업로드
 * @param {Object} postData
 */
export async function uploadPost(postData) {
  if (postData.uploadThumbnail) {
    // 썸네일 업로드
    const { uploadThumbnail, thumbnailAlt } = postData;

    try {
      const uploadThumbnailRes = await uploadImage(
        uploadThumbnail,
        thumbnailAlt
      );
      const thumbnail = uploadThumbnailRes.idx;
      postData.thumbnail = thumbnail;
    } catch (err) {
      if (err.response?.data.msg) console.error(err.response.data.msg);
    }
  }

  try {
    const json = await axios.post("/apis/posts", {
      checkAuth: true,
      postData,
    });
  } catch (err) {
    if (err.response?.data.msg) console.error(err.response.data.msg);
  }
}

/**
 * * 게시글 수정
 * @param {Object} postData
 */
export async function editPost(postData) {
  try {
    const uploadThumbnailRes = await uploadImage(uploadThumbnail, thumbnailAlt);
    const thumbnail = uploadThumbnailRes.idx;

    postData.thumbnail = thumbnail;
    const json = await axios.post(`/apis/posts/${postData.postIdx}`, {
      checkAuth: true,
      postData,
    });
  } catch (err) {
    if (err.response?.data.msg) console.error(err.response.data.msg);
  }
}
