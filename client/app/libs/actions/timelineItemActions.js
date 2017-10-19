import { jsonGetRequest } from "../utils/Requests";
import * as constants from "../constants/timelineItemConstants";

export const setIsFetchingTimelineItem = id => ({
  id,
  type: constants.SET_IS_FETCHING_TIMELINE_ITEM,
});

export const fetchTimelineItemSuccess = timelineItem => ({
  timelineItem,
  type: constants.FETCH_TIMELINE_ITEM_SUCCESS,
});

export const fetchTimelineItemFailure = error => ({
  error,
  type: constants.FETCH_TIMELINE_ITEM_FAILURE,
});

export const fetchTimelineItem = id => async dispatch => {
  dispatch(setIsFetchingTimelineItem(id));
  if (id < 0) {
    return dispatch(fetchTimelineItemFailure("Item ID provided is invalid."));
  }
  const url = `${constants.TIMELINE_ITEMS_PATH}/${id}`;
  try {
    const data = await jsonGetRequest(url);
    return dispatch(fetchTimelineItemSuccess(data));
  } catch (error) {
    return dispatch(
      fetchTimelineItemFailure(
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};
