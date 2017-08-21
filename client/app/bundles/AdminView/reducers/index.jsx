import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, { initialState as userState } from "./userReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";
import pageNavReducer, { initialState as pageNavState } from "./pageNavReducer";

export const initialStates = {
  user: userState,
  users: usersState,
  pageNav: pageNavState,
};

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  pageNav: pageNavReducer,
  routerReducer,
});
