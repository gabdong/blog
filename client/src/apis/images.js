import axios from "../utils/axios";

export async function uploadImage(blob, alt) {
  const { name, size } = blob;

  const duplicatedImg = await axios.get("/apis/images/", {
    params: { name, size },
  });

  const uploadImg = await axios.get();
  return "test";
}
