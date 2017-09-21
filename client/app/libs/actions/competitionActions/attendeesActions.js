import { jsonGetRequest } from "libs/utils/Requests";
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
    return dispatch(fetchCompetitionAttendeesSuccess(json));
  } catch (error) {
    return dispatch(fetchCompetitionAttendeesFailure(error));
  }
};
