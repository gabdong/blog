import axios from "axios";

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";
export const SET_USER = "user/SET_USER";

//g ACTION
export const loginUser = async (data) => {
  const req = axios.post("/api/user/login", data).then((res) => res.data);
  const userInfo = await req;

  userInfo[0].isLogin = true;

  return {
    type: LOGIN_USER,
    payload: userInfo[0],
  };
};

//g INITIAL STATE
const INITIAL_STATE = {
  idx: 0,
  name: "",
  isLogin: null,
};

//g REDUCER
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        idx: action.payload.idx,
        name: action.payload.name,
        isLogin: action.payload.isLogin,
      };
    default:
      return state;
  }
}

export default userReducer;
