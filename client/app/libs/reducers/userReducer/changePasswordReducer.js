import * as constants from "../../constants/userConstants";

export const initialState = {
  isChangingPassword: false,
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, error } = action;

  switch (type) {
    case constants.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isChangingPassword: false,
        error: "",
      };
    }

    case constants.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        isChangingPassword: false,
        error,
      };
    }

    case constants.SET_IS_CHANGING_PASSWORD: {
      return {
        ...state,
        isChangingPassword: true,
        error: "",
      };
    }

    default: {
      return state;
    }
  }
};
