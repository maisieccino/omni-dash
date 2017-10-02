import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import pageNavReducer, {
  initialState as pageNavState,
} from "libs/reducers/pageNavReducer";
import competitionReducer, {
  initialState as competitionState,
} from "libs/reducers/competitionReducer";
import eventsReducer, {
  initialState as eventsState,
} from "libs/reducers/eventsReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";

export const initialStates = {
  competition: competitionState,
  current_user: {},
  user: userState,
  users: usersState,
  pageNav: pageNavState,
  events: eventsState,
};

export default combineReducers({
  competition: competitionReducer,
  current_user: (state = {}) => state,
  user: userReducer,
  users: usersReducer,
  pageNav: pageNavReducer,
  events: eventsReducer,
  routerReducer,
});
