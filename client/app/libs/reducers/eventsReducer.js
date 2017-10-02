import * as constants from "libs/constants/eventsConstants";

export const initialState = {
  isFetching: false,
  isCreating: false,
  events: [],
  event: {},
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

    case constants.SET_IS_CREATING_EVENT: {
      return {
        ...state,
        isCreating: true,
        error: "",
      };
    }

    case constants.CREATE_EVENT_FAILURE: {
      return {
        ...state,
        isCreating: false,
        error,
      };
    }

    case constants.CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        event,
      };
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
