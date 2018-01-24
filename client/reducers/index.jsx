import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, { initialState as userState } from "./userReducer";
import competitionReducer, {
  initialState as competitionState,
} from "./competitionReducer";
import notificationsReducer, {
  initialState as notificationsState,
} from "./notificationsReducer";
import timelineItemReducer, {
  initialState as timelineItemState,
} from "./timelineItemReducer";
import eventsReducer, { initialState as eventsState } from "./eventsReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";

export const initialStates = {
  competition: competitionState,
  current_user: {},
  notifications: notificationsState,
  user: userState,
  users: usersState,
  events: eventsState,
  timelineItem: timelineItemState,
};

export default combineReducers({
  competition: competitionReducer,
  current_user: (state = {}) => state,
  notifications: notificationsReducer,
  user: userReducer,
  users: usersReducer,
  events: eventsReducer,
  timelineItem: timelineItemReducer,
  routerReducer,
});
