import { combineReducers } from "redux";
import user from "./user-reducer";
import poll from "./poll-reducer";
import poll_item from "./poll-item-reducer";
import loading from "./loading";

const reducer = combineReducers({
  user: user,
  poll: poll,
  poll_item: poll_item,
  loading: loading,
});

export default reducer;
