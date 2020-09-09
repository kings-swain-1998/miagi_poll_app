import * as Types from "../constant/index";
var initialState = {
  isLogin: false,
  avatar: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCES:
      return {
        ...state,
        isLogin: true,
      };
    case Types.LOGIN_FAIL:
      return {
        isLogin: false,
      };
    case Types.LOGGED_IN:
      return {
        ...state,
        isLogin: true,
      };
    case Types.LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
export default user;
