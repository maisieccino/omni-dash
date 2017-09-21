import * as constants from "../../constants/competitionConstants";

export const initialState = {
  isFetching: false,
  error: "",
  attendees: [],
};

export default (state = initialState, action = null) => {
  const { type, attendees, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_COMPETITION_ATTENDEES: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case constants.FETCH_COMPETITION_ATTENDEES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case constants.FETCH_COMPETITION_ATTENDEES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: "",
        attendees,
      };
    }

    default: {
      return state;
    }
  }
};
