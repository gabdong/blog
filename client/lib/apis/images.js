import axios from "../utils/axios";

/**
 * * 이미지 업로드
 * @param {File} blob
 * @param {String} alt
 * @returns {Object} {url: String, alt: String}
 */
export async function uploadImage(blob = null, alt = null) {
  const { name, size } = blob;

  let url, idx;
  //* 중복된 이미지 확인
  try {
    const duplicatedImgData = await axios.get("/apis/images/", {
      params: { name, size },
    });

    if (duplicatedImgData.data.url) {
      //* 중복된 이미지 사용
      url = duplicatedImgData.data.url;
      alt = duplicatedImgData.data.alt;
      idx = duplicatedImgData.data.idx;
      alert("중복된 이미지가 있어 정보를 불러옵니다.");
    } else {
      //* 이미지 업로드
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("alt", alt ?? name);
      formData.append("checkAuth", true);

      const imageData = await axios.post("/apis/images", formData);
      url = imageData.data.url;
      idx = imageData.data.idx;
      alt = imageData.data.alt;
    }
    return { url, alt, idx };
  } catch (err) {
    if (err.response.data.msg) {
      alert(err.response.data.msg);
    } else {
      if (err.response.status == 415) {
        alert("잘못된 확장자입니다.");
      } else {
        alert("이미지 업로드를 실패하였습니다.");
      }
    }
  }
}
