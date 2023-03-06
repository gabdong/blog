import axios from "../utils/axios";

export async function uploadImage(blob, alt) {
  const { name, size } = blob;

  let url;

  // 중복된 이미지 확인
  const duplicatedImgData = await axios.get("/apis/images/", {
    params: { name, size },
  });

  if (duplicatedImgData.data.url) { //* 중복된 이미지 사용
    url = duplicatedImgData.data.url;
    alt = duplicatedImgData.data.alt;

    alert('중복된 이미지가 있어 정보를 불러옵니다.');
  } else { //* 이미지 업로드
    const formData = new FormData();
    formData.append("image", blob);
    formData.append("alt", alt);
    formData.append("checkAuth", true);
  
    const imageData = await axios.post("/apis/images", formData);
    url = imageData.data.url;
  }

  return { url, alt };
}
