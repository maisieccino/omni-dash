import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import userReducer, {
  initialState as userState,
} from "libs/reducers/userReducer";
import pageNavReducer, {
  initialState as pageNavState,
} from "libs/reducers/pageNavReducer";
import usersReducer, { initialState as usersState } from "./usersReducer";

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
