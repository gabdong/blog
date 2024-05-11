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
export async function saveTag(tagName, setTagList) {
  const tagNameArr = tagName
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gim, "")
    .split(",")
    .filter(Boolean);

  if (tagNameArr.length === 0) return alert("추가할 태그명을 입력해주세요.");

  try {
    const saveTagRes = await axios.post("/apis/tags/", {
      tags: tagNameArr,
      checkAuth: true,
    });

    const { errorList, saveTagList } = saveTagRes.data;

    //TODO 중복, 에러 구분메세지
    if (errorList.length > 0)
      console.error(`${errorList.length}개의 태그 저장을 실패하였습니다.`);

    setTagList(saveTagList);
  } catch (err) {
    console.error(err.reponse.data.msg);
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
