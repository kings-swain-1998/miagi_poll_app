import * as Types from "../constant/index";
var initialState = [];

const poll = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DATA_SUCCES:
      return [action.payload];
    case Types.ADD_POLL_SUCCES:
      state[0].unshift(action.payload);
      return [...state];
    case Types.EDIT_POLL_CONTENT_SUCCES:
      const id = parseInt(action.idContent);
      const i = findIndex(state[0], id);
      return [(state[i].content = action.payload.content), ...state];
    default:
      return state;
  }
};

const findIndex = (arr, id) => {
  if (arr.length > 0) {
    for (let i = 2; i <= arr.length; i++) {
      if (arr[i].id === id) {
        return i;
      }
    }
  }
};
export default poll;
