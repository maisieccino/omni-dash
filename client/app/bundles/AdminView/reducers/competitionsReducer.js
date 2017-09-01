import * as constants from "../constants/competitionsConstants";

export const initialState = {
  isFetching: false,
  competitions: [],
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, competitions, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_COMPETITIONS: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case constants.FETCH_COMPETITIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        competitions,
      };
    }

    case constants.FETCH_COMPETITIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    default: {
      return state;
    }
  }
};
