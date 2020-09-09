import * as Types from "../constant/index";

var initialState = {};
const poll_item = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_POLL_ITEM_SUCCES:
      return (state = action.payload);
    case Types.ADD_POLL_ITEM_SUCCES:
      console.log(action.payload);
      state.poll_question.unshift(action.payload);
      return { ...state };
    case Types.EDIT_QUESTION:
      const index = findIndex(state.poll_question, action.payload.id);
      state.poll_question[index].content = action.payload.data;
      return {
        ...state,
      };
    case Types.DELETE_SUCCES:
      const index_delete = findIndex(state.poll_question, action.payload);
      state.poll_question.splice(index_delete, 1);
      return { ...state };
    default:
      return state;
  }
};

const findIndex = (arr, id) => {
  if (arr.length > 0) {
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i].id === id) {
        return i;
      }
    }
  }
};

export default poll_item;
