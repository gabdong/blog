import axios from "../utils/axios";

/**
 * * 태그리스트 요청
 * @returns {Array} tagList
 */
export async function getTagList(setState) {
    const tagListRes = await axios.get('/apis/tags/');
    const { tagList } = tagListRes.data;

    setState(tagList);
}