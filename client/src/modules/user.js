import axios from "axios";

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";

//g ACTION
export const loginUser = (sendData) => {
  const request = axios
    .post("/api/test", sendData)
    .then((response) => {
      console.log(response.data);

      return response.data;
    });

  return {
    type: LOGIN_USER,
    payload: request,
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
