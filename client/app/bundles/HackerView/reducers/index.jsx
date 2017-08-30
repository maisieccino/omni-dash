import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import pageNavReducer, { initialState as pageNavState } from "./pageNavReducer";

export const initialStates = {
  current_user: {},
  user: userState,
  pageNav: pageNavState,
};

export default combineReducers({
  current_user: (state = {}) => state,
  user: userReducer,
  pageNav: pageNavReducer,
  routerReducer,
});
