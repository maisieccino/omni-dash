import * as constants from "../../constants/userConstants";
import changePasswordReducer, {
  initialState as changePasswordState,
} from "./changePasswordReducer";

export const initialState = {
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  isSigningOut: false,
  signOutError: "",
  isUploadingAvatar: false,
  isSigningIn: false,
  signInError: "",
  updateSuccess: false,
  user: {},
  userChangedFields: {},
  error: "",
  changePassword: changePasswordState,
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

    case constants.SET_IS_UPLOADING_AVATAR: {
      return {
        ...state,
        error: "",
        isUploadingAvatar: true,
      };
    }

    case constants.UPLOAD_AVATAR_SUCCESS: {
      return {
        ...state,
        isUploadingAvatar: false,
      };
    }

    case constants.UPLOAD_AVATAR_FAILURE: {
      return {
        ...state,
        isUploadingAvatar: false,
        error,
      };
    }

    case constants.SET_IS_SIGNING_IN: {
      return {
        ...state,
        isSigningIn: true,
        signInError: "",
      };
    }

    case constants.SIGN_IN_SUCCESS: {
      return {
        ...state,
        isSigningIn: false,
      };
    }

    case constants.SIGN_IN_FAILURE: {
      return {
        ...state,
        isSigningIn: false,
        signInError: error,
      };
    }

    case constants.SET_IS_SIGNING_OUT: {
      return {
        ...state,
        isSigningOut: true,
        signOutError: "",
      };
    }

    case constants.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isSigningOut: false,
        user: {},
      };
    }

    case constants.SIGN_OUT_FAILURE: {
      return {
        ...state,
        isSigningOut: false,
        signOutError: error,
      };
    }

    // password change reducer
    case constants.CHANGE_PASSWORD_SUCCESS:
    case constants.CHANGE_PASSWORD_FAILURE:
    case constants.SET_IS_CHANGING_PASSWORD: {
      return {
        ...state,
        changePassword: changePasswordReducer(state.changePassword, action),
      };
    }

    default: {
      return state;
    }
  }
};
