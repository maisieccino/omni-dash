import Requests from "libs/utils/Requests";
import * as constants from "../constants/competitionsConstants";

export const setIsFetchingCompetitions = () => ({
  type: constants.SET_IS_FETCHING_COMPETITIONS,
});

export const fetchCompetitionsSuccess = competitions => ({
  type: constants.FETCH_COMPETITIONS_SUCCESS,
  competitions,
});

export const fetchCompetitionsFailure = error => ({
  type: constants.FETCH_COMPETITIONS_SUCCESS,
  error,
});

export const fetchCompetitions = () => dispatch => {
  dispatch(setIsFetchingCompetitions());
  return Requests.jsonGetRequest(constants.COMPETITIONS_PATH)
    .then(json => dispatch(fetchCompetitionsSuccess(json)))
    .catch(error => dispatch(fetchCompetitionsFailure(error.message)));
};
