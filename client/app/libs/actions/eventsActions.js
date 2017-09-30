import * as constants from "libs/constants/eventsConstants";
import { jsonGetRequest } from "libs/utils/Requests";

export const setIsFetchingEvents = () => ({
  type: constants.SET_IS_FETCHING_EVENTS,
});

export const fetchEventsSuccess = events => ({
  type: constants.FETCH_EVENTS_SUCCESS,
  events,
});

export const fetchEventsFailure = error => ({
  type: constants.FETCH_EVENTS_FAILURE,
  error,
});

export const fetchEvents = () => async dispatch => {
  dispatch(setIsFetchingEvents());
  try {
    const events = await jsonGetRequest(constants.EVENTS_PATH);
    return dispatch(fetchEventsSuccess(events));
  } catch (error) {
    return dispatch(
      fetchEventsFailure(typeof error === "string" ? error : error.message),
    );
  }
};
