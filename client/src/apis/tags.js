import axios from "../utils/axios";

/**
 * * 태그리스트 요청
 * @param {Function} setState
 * @returns {Array} tagList
 */
export async function getTagList() {
    const tagListRes = await axios.get('/apis/tags/');
    const { tagList } = tagListRes.data;

    return tagList;
}

/**
 * * 태그 추가
 * @param {String} tagName
 * @param {Function} setTagList
 */
export async function addTag(tagName, setTagList = null) {
    const tagNameArr = tagName.replace(/(<([^>]+)>)/gi, '').replace(/[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/\s]/gim, '').split(','); // eslint-disable-line

    if (tagNameArr.length === 0) return alert("추가할 태그명을 입력해주세요.");

    try {
        await axios.post('/apis/tags/', { tags: tagNameArr, checkAuth: true }).then(async () => {
            if (setTagList) setTagList(await getTagList());
        });
    } catch (err) {
        throw err;
    }
}