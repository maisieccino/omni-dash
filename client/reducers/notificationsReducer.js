import * as constants from "../constants/notificationsConstants";

export const initialState = {
  notifications: [],
  isFetching: false,
  error: "",
};

/**
 *
 * @param {* Array of notification objects} fst
 * @param {* Array of notification objects} snd
 */
const merge = (fst, snd) => [
  ...fst,
  ...snd.filter(x => fst.filter(y => y.id === x.id).length === 0),
];

export default (state = initialState, action = null) => {
  const { type, notification, notifications, error, id } = action;
  switch (type) {
    case constants.ON_RECEIVE_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, notification],
      };
    }

    case constants.SET_IS_FETCHING_NOTIFICATIONS: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case constants.FETCH_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        notifications: merge(state.notifications, notifications),
      };
    }

    case constants.FETCH_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error,
      };
    }

    case constants.SEEN_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.map(
          x => (x.id === id ? { ...x, seen: true } : x),
        ),
      };
    }

    case constants.DISMISS_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(x => x.id !== id),
      };
    }

    default:
      return state;
  }
};
