import * as constants from "../constants/eventsConstants";
import {
  jsonGetRequest,
  jsonPostRequest,
  jsonDeleteRequest,
} from "../utils/Requests";

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

export const setIsCreatingEvent = () => ({
  type: constants.SET_IS_CREATING_EVENT,
});

export const createEventSuccess = event => ({
  type: constants.CREATE_EVENT_SUCCESS,
  event,
});

export const createEventFailure = error => ({
  type: constants.CREATE_EVENT_FAILURE,
  error,
});

export const createEvent = params => async dispatch => {
  dispatch(setIsCreatingEvent());
  try {
    const event = await jsonPostRequest(constants.EVENTS_PATH, params);
    return dispatch(createEventSuccess(event));
  } catch (error) {
    return dispatch(
      createEventFailure(typeof error === "string" ? error : error.message),
    );
  }
};

export const setIsSDeletingEvent = () => ({
  type: constants.SET_IS_DELETING_EVENT,
});

export const deleteEventSuccess = eventId => ({
  type: constants.DELETE_EVENT_SUCCESS,
  eventId,
});

export const deleteEventFailure = error => ({
  type: constants.DELETE_EVENT_FAILURE,
  error,
});

export const deleteEvent = eventId => async dispatch => {
  await dispatch(setIsSDeletingEvent());
  try {
    await jsonDeleteRequest(`${constants.EVENTS_PATH}/${eventId}`);
    return dispatch(deleteEventSuccess(eventId));
  } catch (error) {
    return dispatch(
      deleteEventFailure(typeof error === "string" ? error : error.message),
    );
  }
};
