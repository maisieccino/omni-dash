import {
  jsonGetRequest,
  jsonPutRequest,
  jsonDeleteRequest,
} from "libs/utils/Requests";
import * as constants from "libs/constants/userConstants";

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

export const fetchUser = id => dispatch => {
  dispatch(setIsFetching());
  const uri = id ? `/users/${id}/` : constants.USER_ME_PATH;
  return jsonGetRequest(uri)
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(error => dispatch(fetchUserFailure(error.message)));
};

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
export const updateUser = (data = {}) => dispatch => {
  dispatch(setIsUpdating());
  return jsonPutRequest(constants.USER_ME_PATH, data)
    .then(
      () =>
        // fake delay
        new Promise(res => {
          setTimeout(() => res(), 1000);
        }),
    )
    .then(() => {
      dispatch(updateUserSuccess());
      dispatch(fetchUser());
    })
    .catch(err => dispatch(updateUserFailure(err.message)));
};

export const setIsDeletingUser = () => ({
  type: constants.SET_IS_DELETING_USER,
});

export const deleteUserSuccess = () => ({
  type: constants.DELETE_USER_SUCCESS,
});

export const deleteUserFailure = error => ({
  type: constants.DELETE_USER_FAILURE,
  error,
});

export const deleteUser = id => async dispatch => {
  dispatch(setIsDeletingUser());
  try {
    await jsonDeleteRequest(id ? `/users/${id}` : constants.USER_ME_PATH);
    await new Promise(res => setTimeout(res, 1000));
    return dispatch(deleteUserSuccess());
  } catch (error) {
    return dispatch(
      deleteUserFailure(typeof error === "string" ? error : error.message),
    );
  }
};
