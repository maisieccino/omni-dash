import * as constants from "libs/constants/eventsConstants";

export const initialState = {
  isFetching: false,
  events: [],
  error: "",
};

const eventsReducer = (state = initialState, action = null) => {
  const { type, error, events } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_EVENTS: {
      return {
        ...state,
        error: "",
        isFetching: true,
      };
    }

    case constants.FETCH_EVENTS_FAILURE: {
      return {
        ...state,
        error,
        isFetching: false,
      };
    }

    case constants.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        events,
      };
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
