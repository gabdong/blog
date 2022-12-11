//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";

//g ACTION
export const logInUser = (sendData) => {
  return {
    type: LOGIN_USER,
  };
};

//g REDUCER
function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default userReducer;
