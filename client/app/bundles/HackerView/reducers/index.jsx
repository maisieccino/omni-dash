import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import competitionReducer, {
  initialState as competitionState,
} from "libs/reducers/competitionReducer";
import timelineItemReducer, {
  initialState as timelineItemState,
} from "libs/reducers/timelineItemReducer";
import eventsReducer, {
  initialState as eventsState,
} from "libs/reducers/eventsReducer";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";

export const initialStates = {
  current_user: {},
  events: eventsState,
  user: userState,
  competition: competitionState,
  timelineItem: timelineItemState,
};

export default combineReducers({
  current_user: (state = {}) => state,
  events: eventsReducer,
  competition: competitionReducer,
  timelineItem: timelineItemReducer,
  user: userReducer,
  routerReducer,
});
