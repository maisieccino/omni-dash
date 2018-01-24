import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import competitionReducer, {
  initialState as competitionState,
} from "libs/reducers/competitionReducer";
import timelineItemReducer, {
  initialState as timelineItemState,
} from "libs/reducers/timelineItemReducer";
import eventsReducer, {
  initialState as eventsState,
} from "libs/reducers/eventsReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";

export const initialStates = {
  competition: competitionState,
  current_user: {},
  user: userState,
  users: usersState,
  events: eventsState,
  timelineItem: timelineItemState,
};

export default combineReducers({
  competition: competitionReducer,
  current_user: (state = {}) => state,
  user: userReducer,
  users: usersReducer,
  events: eventsReducer,
  timelineItem: timelineItemReducer,
  routerReducer,
});
