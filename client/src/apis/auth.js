import axios from '../utils/axios'

export async function refreshAuth() {
    try {
        const res = await axios.post("/apis/user/refreshAuth");
        const {accessToken, auth} = res.data;

        if (!auth) return false;
  
        if (accessToken) axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const {id} = auth;
        const {user} = await (await axios.get(`/apis/user/user/${id}`)).data;

        return user;
    } catch (err) {
        const {msg} = err.response.data;
  
        return msg;
    }
};