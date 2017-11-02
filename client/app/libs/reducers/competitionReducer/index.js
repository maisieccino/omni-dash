import * as constants from "../../constants/competitionConstants";
import attendeesReducer, {
  initialState as attendeesState,
} from "./attendeesReducer";

export const initialState = {
  isFetching: false,
  isSaving: false,
  isDeleting: false,
  isUpdating: false,
  competitionExists: true,
  competition: {},
  attendees: attendeesState,
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, competition, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_COMPETITION: {
      return {
        ...state,
        isFetching: true,
        competitionExists: true,
        error: "",
      };
    }

    case constants.FETCH_COMPETITION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        competitionExists: true,
        competition,
      };
    }

    case constants.FETCH_COMPETITION_FAILURE: {
      return {
        ...state,
        isFetching: false,
        competitionExists: false,
        error,
      };
    }

    case constants.SET_IS_SAVING_COMPETITION: {
      return {
        ...state,
        isSaving: true,
        error: "",
      };
    }

    case constants.SAVE_COMPETITION_SUCCESS: {
      return {
        ...state,
        isSaving: false,
        competition,
      };
    }

    case constants.SAVE_COMPETITION_FAILURE: {
      return {
        ...state,
        isSaving: false,
        error,
      };
    }

    case constants.SET_IS_UPDATING_COMPETITION: {
      return {
        ...state,
        isUpdating: true,
        error: "",
      };
    }

    case constants.UPDATE_COMPETITION_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
      };
    }

    case constants.UPDATE_COMPETITION_FAILURE: {
      return {
        ...state,
        isUpdating: false,
        error,
      };
    }

    case constants.SET_IS_DELETING_COMPETITION: {
      return {
        ...state,
        isDeleting: true,
        error: "",
      };
    }

    case constants.DELETE_COMPETITION_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        competitionExists: false,
        competition: {},
      };
    }

    case constants.DELETE_COMPETITION_FAILURE: {
      return {
        ...state,
        isDeleting: false,
        error,
      };
    }

    case constants.SET_IS_FETCHING_COMPETITION_ATTENDEES:
    case constants.FETCH_COMPETITION_ATTENDEES_SUCCESS:
    case constants.FETCH_COMPETITION_ATTENDEES_FAILURE:
    case constants.SET_IS_INVITING_COMPETITION_ATTENDEE:
    case constants.INVITE_COMPETITION_ATTENDEE_SUCCESS:
    case constants.INVITE_COMPETITION_ATTENDEE_FAILURE:
    case constants.SET_IS_MESSAGING_ATTENDEES:
    case constants.COMPETITION_MESSAGE_ATTENDEES_SUCCESS:
    case constants.COMPETITION_MESSAGE_ATTENDEES_FAILURE: {
      return {
        ...state,
        attendees: attendeesReducer(state.attendees, action),
      };
    }

    default: {
      return state;
    }
  }
};
