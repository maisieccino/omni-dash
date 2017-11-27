import * as constants from "libs/constants/eventsConstants";

export const initialState = {
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  events: [],
  event: {},
  error: "",
};

const eventsReducer = (state = initialState, action = null) => {
  const { type, error, events, eventId } = action;

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

    case constants.SET_IS_DELETING_EVENT: {
      return {
        ...state,
        isDeleting: true,
        error: "",
      };
    }

    case constants.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        // remove this event from state.
        events: state.events.filter(event => event.id !== eventId),
      };
    }

    case constants.DELETE_EVENT_FAILURE: {
      return {
        ...state,
        isDeleting: false,
        error,
      };
    }

    default: {
      return state;
    }
  }
};

export default eventsReducer;
