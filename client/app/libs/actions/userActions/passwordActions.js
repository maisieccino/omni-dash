import { jsonPutRequest } from "libs/utils/Requests";
import * as constants from "libs/constants/userConstants";

export const changePasswordSuccess = () => ({
  type: constants.CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = error => ({
  type: constants.CHANGE_PASSWORD_FAILURE,
  error,
});

export const setIsChangingPassword = () => ({
  type: constants.SET_IS_CHANGING_PASSWORD,
});

export const changePassword = (
  oldPassword,
  newPassword,
  newPasswordConfirm,
) => async dispatch => {
  await dispatch(setIsChangingPassword());
  if (!oldPassword) {
    return dispatch(
      changePasswordFailure("You need to enter your current password."),
    );
  }
  if (!newPassword) {
    return dispatch(changePasswordFailure("You need to enter a new password."));
  }
  if (!newPasswordConfirm) {
    return dispatch(
      changePasswordFailure("You need to enter your new password again."),
    );
  }
  if (newPassword !== newPasswordConfirm) {
    return dispatch(changePasswordFailure("Your new passwords do not match."));
  }

  // make the request
  try {
    await jsonPutRequest(constants.CHANGE_PASSWORD_PATH, {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    });
    return dispatch(changePasswordSuccess());
  } catch (error) {
    return dispatch(changePasswordFailure(error.message));
  }
};
