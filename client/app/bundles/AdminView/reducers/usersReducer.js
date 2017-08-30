import * as constants from "../constants/usersConstants";

export const initialState = {
  isFetching: false,
  users: [],
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, users, error } = action;

  switch (type) {
    case constants.SET_IS_FETCHING_USERS: {
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    }

    case constants.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        users,
      };
    }

    case constants.FETCH_USERS_FAILURE: {
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
