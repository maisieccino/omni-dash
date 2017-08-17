import Requests from "libs/utils/Requests";
import * as constants from "../constants/userConstants";

export const setIsFetching = () => ({
  type: constants.SET_IS_FETCHING,
});

export const fetchUserSuccess = data => ({
  type: constants.FETCH_USER_SUCCESS,
  user: data,
});

export const fetchUserFailure = error => ({
  type: constants.FETCH_USER_FAILURE,
  error,
});

export const fetchUser = () => ((dispatch) => {
  dispatch(setIsFetching());
  return Requests.jsonGetRequest(constants.USER_ME_PATH)
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(error => dispatch(fetchUserFailure(error.message)));
});

export const changeSettingValues = values => ({
  type: constants.CHANGE_SETTING_VALUES,
  values,
});

export const setIsUpdating = () => ({
  type: constants.SET_IS_UPDATING,
});

export const setUpdateSuccess = (success = false) => ({
  type: constants.SET_UPDATE_SUCCESS,
  success,
});

export const updateUserSuccess = () => ({
  type: constants.UPDATE_USER_SUCCESS,
});

export const updateUserFailure = error => ({
  type: constants.UPDATE_USER_FAILURE,
  error,
});

/**
 * Action to update user information on the server.
 * @param  {Object} [data={}] Updated information to send
 * @return {Promise}           Resolves or fails
 */
export const updateUser = (data = {}) => ((dispatch) => {
  dispatch(setIsUpdating());
  return Requests.jsonPutRequest(constants.USER_ME_PATH, data)
    .then(() =>
      // fake delay
      new Promise((res) => {
        setTimeout(() => res(), 1000);
      }),
    )
    .then(() => {
      dispatch(updateUserSuccess());
      dispatch(fetchUser());
    })
    .catch(err => dispatch(updateUserFailure(err.message)));
});
