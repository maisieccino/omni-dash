import Requests from "libs/utils/Requests";
import * as constants from "../constants/usersConstants";

export const setIsFetchingUsers = () => ({
  type: constants.SET_IS_FETCHING_USERS,
});

export const fetchUsersSuccess = users => ({
  type: constants.FETCH_USERS_SUCCESS,
  users,
});

export const fetchUsersFailure = error => ({
  type: constants.FETCH_USERS_FAILURE,
  error,
});

export const fetchUsers = () => ((dispatch) => {
  dispatch(setIsFetchingUsers());
  return Requests.jsonGetRequest(constants.USERS_PATH)
    .then(json => dispatch(fetchUsersSuccess(json)))
    .catch(error => dispatch(fetchUsersFailure(error.message)));
});
