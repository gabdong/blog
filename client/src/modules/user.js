import axios from "axios";

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";
export const SET_USER = "user/SET_USER";

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

export const setUser = () => {

}

//g INITIAL STATE
const initialState = {
  user: {
    idx: 0,
    name: ''
  }
};

//g REDUCER
function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload,
      };
    case SET_USER:
      return {

      };
    default:
      return state;
  }
}

export default userReducer;
