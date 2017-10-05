import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import competitionReducer, {
  initialState as competitionState,
} from "libs/reducers/competitionReducer";

export const initialStates = {
  current_user: {},
  user: userState,
  competition: competitionState,
};

export default combineReducers({
  current_user: (state = {}) => state,
  user: userReducer,
  competition: competitionReducer,
  routerReducer,
});
