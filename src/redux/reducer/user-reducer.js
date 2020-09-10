import * as Types from "../constant/index";
var initialState = {
  isLogin: false,
  avatar: "",
  isLogout: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_SUCCES:
      return {
        isLogout: false,
        isLogin: true,
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
        isLogout: true,
      };
    default:
      return state;
  }
};
export default user;
