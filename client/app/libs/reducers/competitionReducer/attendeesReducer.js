import * as constants from "../../constants/competitionConstants";

export const initialState = {
  isFetching: false,
  isInviting: false,
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

    case constants.SET_IS_INVITING_COMPETITION_ATTENDEE: {
      return {
        ...state,
        isInviting: true,
        error: "",
      };
    }

    case constants.INVITE_COMPETITION_ATTENDEE_FAILURE: {
      return {
        ...state,
        isInviting: false,
        error,
      };
    }

    case constants.INVITE_COMPETITION_ATTENDEE_SUCCESS: {
      return {
        ...state,
        isInviting: false,
      };
    }

    default: {
      return state;
    }
  }
};
