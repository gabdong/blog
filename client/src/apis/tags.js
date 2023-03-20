import axios from "../utils/axios";

/**
 * * 태그리스트 요청
 * @returns {Array} tagList
 */
export async function getTagList() {
  const tagListRes = await axios.get("/apis/tags/");
  const { tagList } = tagListRes.data;

  return tagList;
}

/**
 * * 태그 추가
 * @param {String} tagName
 * @param {Function} setTagList
 */
export async function addTag(tagName) {
  const tagNameArr = tagName
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gim, "")
    .split(",")
    .filter(Boolean); // eslint-disable-line

  if (tagNameArr.length === 0) return alert("추가할 태그명을 입력해주세요.");

  try {
    await axios.post("/apis/tags/", { tags: tagNameArr, checkAuth: true });
  } catch (err) {
    alert(err.reponse.data.msg);
  }
}

/**
 * * 태그 수정
 * @param {Number} tagIdx
 */
export async function updateTag(tagIdx, name) {
  const body = { name, checkAuth: true };
  await axios.put(`/apis/tags/${tagIdx}`, body);
}

/**
 * * 태그 삭제
 * @param {Number} tagIdx
 */
export async function deleteTag(tagIdx) {
  await axios.delete(`/apis/tags/${tagIdx}`);
}
