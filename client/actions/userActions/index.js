import {
  jsonGetRequest,
  jsonPutRequest,
  jsonDeleteRequest,
  getMetaContent,
  jsonPostRequest
} from "../../utils/Requests";
import * as constants from "../../constants/userConstants";

export const setIsFetching = () => ({
  type: constants.SET_IS_FETCHING
});

export const fetchUserSuccess = data => ({
  type: constants.FETCH_USER_SUCCESS,
  user: data
});

export const fetchUserFailure = error => ({
  type: constants.FETCH_USER_FAILURE,
  error
});

export const fetchUser = id => async dispatch => {
  dispatch(setIsFetching());
  const uri = id ? `/users/${id}/` : constants.USER_ME_PATH;
  try {
    const json = await jsonGetRequest(uri);
    return dispatch(fetchUserSuccess(json));
  } catch (error) {
    return dispatch(
      fetchUserFailure(typeof error === "string" ? error : error.message)
    );
  }
};

export const changeSettingValues = values => ({
  type: constants.CHANGE_SETTING_VALUES,
  values
});

export const resetSettingValues = () => ({
  type: constants.RESET_SETTING_VALUES
});

export const setIsUpdating = () => ({
  type: constants.SET_IS_UPDATING
});

export const setUpdateSuccess = (success = false) => ({
  type: constants.SET_UPDATE_SUCCESS,
  success
});

export const updateUserSuccess = () => ({
  type: constants.UPDATE_USER_SUCCESS
});

export const updateUserFailure = error => ({
  type: constants.UPDATE_USER_FAILURE,
  error
});

/**
 * Action to update user information on the server.
 * @param  {Object} [data={}] Updated information to send
 * @return {Promise}           Resolves or fails
 */
export const updateUser = (data = {}) => async dispatch => {
  dispatch(setIsUpdating());
  try {
    await jsonPutRequest(constants.USER_ME_PATH, data);
    await dispatch(updateUserSuccess());
    await dispatch(fetchUser());
    return dispatch(resetSettingValues());
  } catch (error) {
    return dispatch(updateUserFailure(error.message));
  }
};

export const setIsDeletingUser = () => ({
  type: constants.SET_IS_DELETING_USER
});

export const deleteUserSuccess = () => ({
  type: constants.DELETE_USER_SUCCESS
});

export const deleteUserFailure = error => ({
  type: constants.DELETE_USER_FAILURE,
  error
});

export const deleteUser = id => async dispatch => {
  dispatch(setIsDeletingUser());
  try {
    await jsonDeleteRequest(id ? `/users/${id}` : constants.USER_ME_PATH);
    return dispatch(deleteUserSuccess());
  } catch (error) {
    return dispatch(
      deleteUserFailure(typeof error === "string" ? error : error.message)
    );
  }
};

export const setIsUploadingAvatar = () => ({
  type: constants.SET_IS_UPLOADING_AVATAR
});

export const uploadAvatarSuccess = () => ({
  type: constants.UPLOAD_AVATAR_SUCCESS
});

export const uploadAvatarFailure = error => ({
  type: constants.UPLOAD_AVATAR_FAILURE,
  error
});

export const uploadAvatar = file => async dispatch => {
  await dispatch(setIsUploadingAvatar());
  try {
    const data = new FormData();
    data.append("avatar", file, file.name);
    data.append("authenticity_token", getMetaContent("csrf-token"));
    const res = await fetch(constants.USER_ME_PATH, {
      method: "put",
      body: data,
      credentials: "include"
    });
    if (res.ok) {
      await dispatch(uploadAvatarSuccess());
      return dispatch(fetchUser());
    }
    throw new Error(await res.text());
  } catch (error) {
    return dispatch(
      uploadAvatarFailure(typeof error === "string" ? error : error.message)
    );
  }
};

export const setIsSigningIn = () => ({
  type: constants.SET_IS_SIGNING_IN
});

export const signInSuccess = () => ({
  type: constants.SIGN_IN_SUCCESS
});

export const signInFailure = error => ({
  type: constants.SIGN_IN_FAILURE,
  error
});

export const signIn = (email, password) => async dispatch => {
  await dispatch(setIsSigningIn());
  if (!email) {
    return dispatch(signInFailure("You need to provide an email address."));
  }
  if (!password) {
    return dispatch(signInFailure("You need to provide a password."));
  }

  try {
    await jsonPostRequest(constants.SIGN_IN_PATH, {
      user: {
        email,
        password,
        remember_me: 0
      },
      utf8: "✓",
      commit: "Log in",
      authenticity_token: getMetaContent("csrf-token")
    });
    await dispatch(fetchUser());
    return dispatch(signInSuccess());
  } catch (error) {
    return dispatch(
      signInFailure(typeof error === "string" ? error : error.message)
    );
  }
};

export const setIsSigningOut = () => ({
  type: constants.SET_IS_SIGNING_OUT
});

export const signOutSuccess = () => ({
  type: constants.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: constants.SIGN_OUT_FAILURE,
  error
});

export const signOut = () => async dispatch => {
  await dispatch(setIsSigningOut());
  console.log("Signing out...");
  try {
    await fetch(constants.SIGN_OUT_PATH, {
      method: "DELETE",
      body: {
        utf8: "✓",
        commit: "Sign out"
      }
    });
    return dispatch(signOutSuccess());
  } catch (error) {
    return dispatch(
      signOutFailure(typeof error === "string" ? error : error.message)
    );
  }
};

export * from "./passwordActions";
