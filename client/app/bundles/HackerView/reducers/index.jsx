import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const pageIndex = (state = 0) => state;

const user = (state = {}) => state;

export default combineReducers({
  pageIndex,
  user,
  routing: routerReducer,
});
