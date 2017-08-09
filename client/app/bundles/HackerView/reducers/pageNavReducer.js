import * as constants from "../constants/pageNavConstants";

export const initialState = {
  abovePath: "",
  showBackButton: false,
};

export default (state = {}, action = null) => {
  const { type, abovePath, showBackButton } = action;

  switch (type) {
    case constants.PAGE_HAS_NAVIGATED: {
      return Object.assign({}, state, {
        abovePath,
        showBackButton,
      });
    }

    default: {
      return state;
    }
  }
};
