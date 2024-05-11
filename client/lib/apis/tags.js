import axios from "@/lib/utils/axios";

/**
 * * 태그리스트 요청
 * @returns {Array} tagList
 */
export async function getTagList() {
  try {
    const tagListRes = await axios.get("/apis/tags/");

    return tagListRes;
  } catch (err) {
    console.error(err.response.data.msg);
  }
}

/**
 * * 검색된 태그 요청
 * @param {String} searchWord
 * @param {Array} selectedTags
 */
export async function getSearchTag(searchWord, selectedTags = []) {
  try {
    const searchTagRes = await axios.get("/apis/tags/searchTag", {
      params: { searchWord, selectedTags },
      data: { checkAuth: true },
    });

    return searchTagRes.data.searchTagData;
  } catch (err) {}
}

/**
 * * 태그 추가
 * @param {String} tagName
 * @param {Function} setTagList
 */
export async function createTag(tagName) {
  const tagNameArr = tagName
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gim, "") // eslint-disable-line
    .split(",")
    .filter(Boolean);

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
  await axios.put(`/apis/tags/${tagIdx}`, { name, checkAuth: true });
}

/**
 * * 태그 삭제
 * @param {Number} tagIdx
 */
export async function deleteTag(tagIdx) {
  await axios.delete(`/apis/tags/${tagIdx}`);
}
