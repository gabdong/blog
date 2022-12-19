import axios from "axios";

//g INITIAL STATE
const INITIAL_STATE = {
  idx: 0,
  name: "",
  isLogin: null,
  msg: "",
};

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";
export const SET_USER = "user/SET_USER";

//g ACTION
export const loginUser = async (dataToSubmit) => {
  const req = await axios
    .post("/api/user/login", dataToSubmit)
    .then((res) => {
      console.log('success');
      return res.data;
    })
    .catch((e) => {
      console.log('error');
      return INITIAL_STATE;
    }); //TODO error handling

  return {
    type: LOGIN_USER,
    payload: req,
  };
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
