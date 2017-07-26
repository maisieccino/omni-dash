import { combineReducers } from "redux";

const pageIndex = (state = 0) => {
  return state;
};

const user = (state = {}) => {
  return state;
};

export default combineReducers({ pageIndex, user });
