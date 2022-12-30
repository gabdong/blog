//g INITIAL STATE
const INITIAL_STATE = {
  idx: 0,
  id: "",
  name: "",
  phone: "",
  email: "",
  accessToken: "",
  isLogin: false,
};

//g TYPE
export const LOGIN_USER = "user/LOGIN_USER";
export const LOGOUT_USER = "user/LOGOUT_USER";

//g ACTION
export const loginUser = (dataToSubmit) => {
  const payload = dataToSubmit;
  payload.isLogin = true;

  return {
    type: LOGIN_USER,
    payload: payload,
  };
};
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: { ...INITIAL_STATE },
  };
};

//g REDUCER
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
