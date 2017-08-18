import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, { initialState as userState } from "./userReducer";
import pageNavReducer, { initialState as pageNavState } from "./pageNavReducer";

export const initialStates = {
  user: userState,
  pageNav: pageNavState,
};

export default combineReducers({
  user: userReducer,
  pageNav: pageNavReducer,
  routerReducer,
});
