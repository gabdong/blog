import axios from "axios";

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";

//g ACTION
export const loginUser = (sendData) => {
  const req = axios.post("/api/user/login", sendData).then((res) => {
    console.log(res);
    return res.data;
  });

  return {
    type: LOGIN_USER,
    payload: req,
  };
};

//g REDUCER
function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
