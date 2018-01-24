import { jsonGetRequest, jsonPostRequest } from "../../utils/Requests";
import * as constants from "../../constants/competitionConstants";

export const setIsFetchingCompetitionAttendees = () => ({
  type: constants.SET_IS_FETCHING_COMPETITION_ATTENDEES,
});

export const fetchCompetitionAttendeesSuccess = attendees => ({
  type: constants.FETCH_COMPETITION_ATTENDEES_SUCCESS,
  attendees,
});

export const fetchCompetitionAttendeesFailure = error => ({
  type: constants.FETCH_COMPETITION_ATTENDEES_FAILURE,
  error: typeof error === "string" ? error : error.message,
});

export const fetchCompetitionAttendees = () => async dispatch => {
  dispatch(setIsFetchingCompetitionAttendees());
  try {
    const json = await jsonGetRequest(constants.COMPETITION_INVITES_PATH);
    return dispatch(
      fetchCompetitionAttendeesSuccess(json instanceof Array ? json : [json]),
    );
  } catch (error) {
    return dispatch(fetchCompetitionAttendeesFailure(error));
  }
};

export const setIsMessagingAttendees = () => ({
  type: constants.SET_IS_MESSAGING_ATTENDEES,
});

export const messageAttendeesSuccess = () => ({
  type: constants.COMPETITION_MESSAGE_ATTENDEES_SUCCESS,
});

export const messageAttendeesFailure = error => ({
  type: constants.COMPETITION_MESSAGE_ATTENDEES_FAILURE,
  error,
});

export const messageAttendees = (title = "", message) => async dispatch => {
  dispatch(setIsMessagingAttendees());
  if (!message) {
    return dispatch(messageAttendeesFailure("You must provide a message"));
  }
  try {
    await jsonPostRequest(constants.COMPETITION_MESSAGE_ATTENDEES_PATH, {
      title,
      message,
    });
    return dispatch(messageAttendeesSuccess());
  } catch (error) {
    return dispatch(fetchCompetitionAttendeesFailure(error.message));
  }
};

export const setIsInvitingAttendee = () => ({
  type: constants.SET_IS_INVITING_COMPETITION_ATTENDEE,
});

export const inviteAttendeeSuccess = () => ({
  type: constants.INVITE_COMPETITION_ATTENDEE_SUCCESS,
});

export const inviteAttendeeFailure = error => ({
  type: constants.INVITE_COMPETITION_ATTENDEE_FAILURE,
  error: typeof error === "string" ? error : error.message,
});

export const inviteAttendee = params => async dispatch => {
  dispatch(setIsInvitingAttendee());
  try {
    await jsonPostRequest(constants.COMPETITION_INVITES_PATH, params);
    return dispatch(inviteAttendeeSuccess());
  } catch (error) {
    return dispatch(inviteAttendeeFailure(error));
  }
};
