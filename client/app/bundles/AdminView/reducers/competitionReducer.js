import * as constants from "../constants/competitionConstants";

export const initialState = {
  isFetching: false,
  isSaving: false,
  competition: {},
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, competition, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_COMPETITION: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case constants.FETCH_COMPETITION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        competition,
      };
    }

    case constants.FETCH_COMPETITION_FAILURE: {
      return {
        ...state,
        isFetching: false,
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

    default: {
      return state;
    }
  }
};
