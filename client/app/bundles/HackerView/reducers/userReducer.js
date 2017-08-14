import * as constants from "../constants/userConstants";

export const initialState = {
  isFetching: false,
  isUpdating: false,
  user: {},
  userChangedFields: {},
  error: "",
};

export default (state = {}, action = null) => {
  const { type, user, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING: {
      return Object.assign({}, state, {
        isFetching: true,
      });
    }

    case constants.FETCH_USER_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        user,
      });
    }

    case constants.FETCH_USER_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
        error,
      });
    }

    case constants.SET_IS_UPDATING: {
      return {
        ...state,
        isUpdating: true,
      };
    }

    case constants.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        userChangedFields: {},
      };
    }

    case constants.UPDATE_USER_FAILURE: {
      return {
        ...state,
        isUpdating: false,
        error,
      };
    }

    default: {
      return state;
    }
  }
};
