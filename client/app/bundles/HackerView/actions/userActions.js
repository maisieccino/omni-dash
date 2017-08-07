import * as constants from "../constants/userConstants";

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

export const fetchUser = () => ((dispatch) => {
  dispatch(setIsFetching());
  return fetch(constants.USER_ME_PATH, {
    headers: {
      Accepts: "application/json",
    },
    credentials: "include",
  })
    .then(res => (res.ok ? res.json() : Promise.reject("Bad network response")))
    .then(json => dispatch(fetchUserSuccess(json)))
    .catch(error => dispatch(fetchUserFailure({ error })));
});
