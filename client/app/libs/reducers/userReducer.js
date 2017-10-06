import * as constants from "../constants/userConstants";

export const initialState = {
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  updateSuccess: false,
  user: {},
  userChangedFields: {},
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, user, error, success, values: updatedValues } = action;

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
        updateSuccess: false,
      };
    }

    case constants.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUpdating: false,
        userChangedFields: {},
        updateSuccess: true,
      };
    }

    case constants.UPDATE_USER_FAILURE: {
      return {
        ...state,
        isUpdating: false,
        error,
      };
    }

    case constants.SET_UPDATE_SUCCESS: {
      return {
        ...state,
        updateSuccess: success,
      };
    }

    case constants.SET_IS_DELETING_USER: {
      return {
        ...state,
        isDeleting: true,
        error,
      };
    }

    case constants.DELETE_USER_SUCCESS: {
      return {
        ...state,
        isDeleting: false,
        error: "",
      };
    }

    case constants.DELETE_USER_FAILURE: {
      return {
        ...state,
        isDeleting: false,
        error: true,
      };
    }

    case constants.CHANGE_SETTING_VALUES: {
      return {
        ...state,
        userChangedFields: {
          ...state.userChangedFields,
          ...updatedValues,
        },
      };
    }

    case constants.RESET_SETTING_VALUES: {
      return {
        ...state,
        userChangedFields: {},
      };
    }

    default: {
      return state;
    }
  }
};
