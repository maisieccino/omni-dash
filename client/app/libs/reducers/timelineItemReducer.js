import * as constants from "../constants/timelineItemConstants";

export const initialState = {
  isFetching: false,
  error: "",
  timelineItem: {},
  id: -1,
};

export default (state = initialState, action = null) => {
  const { type, error, timelineItem, id } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_TIMELINE_ITEM: {
      return {
        ...state,
        id,
        isFetching: true,
      };
    }

    case constants.FETCH_TIMELINE_ITEM_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case constants.FETCH_TIMELINE_ITEM_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        timelineItem,
      };
    }

    default: {
      return state;
    }
  }
};
