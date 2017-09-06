import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import competitionReducer, {
  initialState as competitionState,
} from "libs/reducers/competitionReducer";
import pageNavReducer, { initialState as pageNavState } from "./pageNavReducer";

export const initialStates = {
  current_user: {},
  user: userState,
  pageNav: pageNavState,
  competition: competitionState,
};

export default combineReducers({
  current_user: (state = {}) => state,
  user: userReducer,
  pageNav: pageNavReducer,
  competition: competitionReducer,
  routerReducer,
});
