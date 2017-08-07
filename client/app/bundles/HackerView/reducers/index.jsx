import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, { initialState as userState } from "./userReducer";

export const initialStates = {
  user: userState,
  pageIndex: 0,
};

const pageIndex = (state = 0) => state;

export default combineReducers({
  pageIndex,
  user: userReducer,
  routerReducer,
});
