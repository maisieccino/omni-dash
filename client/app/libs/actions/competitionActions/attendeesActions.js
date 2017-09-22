import { jsonGetRequest, jsonPostRequest } from "libs/utils/Requests";
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
    // TODO: Remove timeouts
    await new Promise(res => setTimeout(res, 1000));
    return dispatch(
      fetchCompetitionAttendeesSuccess(json instanceof Array ? json : [json]),
    );
  } catch (error) {
    return dispatch(fetchCompetitionAttendeesFailure(error));
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
    // TODO: Remove timeouts
    await new Promise(res => setTimeout(res, 1000));
    await jsonPostRequest(constants.COMPETITION_INVITES_PATH, params);
    return dispatch(inviteAttendeeSuccess());
  } catch (error) {
    return dispatch(inviteAttendeeFailure(error));
  }
};
