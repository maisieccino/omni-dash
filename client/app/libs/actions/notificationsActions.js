import { jsonGetRequest, jsonPutRequest } from "../utils/Requests";
import * as constants from "../constants/notificationsConstants";

export const onReceiveNotification = notification => ({
  type: constants.ON_RECEIVE_NOTIFICATION,
  notification,
});

export const fetchNotificationsSuccess = notifications => ({
  type: constants.FETCH_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const fetchNotificationsFailure = error => ({
  type: constants.FETCH_NOTIFICATIONS_FAILURE,
  error,
});

export const setIsFetchingNotifications = () => ({
  type: constants.SET_IS_FETCHING_NOTIFICATIONS,
});

export const fetchNotifications = () => async dispatch => {
  dispatch(setIsFetchingNotifications());
  try {
    const response = await jsonGetRequest(constants.NOTIFICATIONS_PATH);
    return dispatch(fetchNotificationsSuccess(response));
  } catch (error) {
    return dispatch(
      fetchNotificationsFailure(
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const notificationIsSeen = id => ({
  id,
  type: constants.SEEN_NOTIFICATION,
});

export const seenNotification = id => async dispatch => {
  const url = `${constants.NOTIFICATIONS_PATH}/${id}/seen`;
  await jsonPutRequest(url);
  return dispatch(notificationIsSeen(id));
};

export const notificationIsDismissed = id => ({
  id,
  type: constants.DISMISS_NOTIFICATION,
});

export const dismissNotification = id => async dispatch => {
  const url = `${constants.NOTIFICATIONS_PATH}/${id}/dismiss`;
  await jsonPutRequest(url);
  return dispatch(notificationIsDismissed(id));
};
