import * as Types from "../constant/index";
var initialState = {
  loading: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOADING_SUCCES:
      console.log(action.payload);
      return {
        loading: action.payload,
      };
    case Types.LOADING_FAIL:
      return {
        loading: action.payload,
      };
    default:
      return state;
  }
};
export default loading;
