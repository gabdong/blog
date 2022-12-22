import axios from "../utils/axios";

export async function refreshAuth() {
  try {
    const res = await axios.post("/apis/user/refreshAuth");
    const { accessToken, auth } = res.data;

    if (!auth) return false;

    if (accessToken)
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const { id } = auth;
    const { user } = await (await axios.get(`/apis/user/${id}`)).data;

    return { status: 200, user };
  } catch (err) {
    const { status } = err.response;
    const { msg } = err.response.data;

    return { status: status, msg };
  }
}

export function removeAuth() {
    axios.delete("/apis/user/auth");
    axios.defaults.headers.common["Authorization"] = "";
}
