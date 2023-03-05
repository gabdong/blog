import axios from "../utils/axios";

export async function uploadImage(blob, alt) {
  const { name, size } = blob;

  //TODO 중복체크
  // const duplicatedImg = await axios.get("/apis/images/", {
  //   params: { name, size },
  // });

  const formData = new FormData();
  formData.append("image", blob);
  formData.append("alt", alt);
  formData.append("checkAuth", true);
  const uploadImg = await axios.post("/apis/images", formData);
  return "test";
}
