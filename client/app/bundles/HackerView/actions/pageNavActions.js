import * as constants from "../constants/pageNavConstants";

export const pageHasNavigated = (abovePath, showBackButton) => ({
  type: constants.PAGE_HAS_NAVIGATED,
  abovePath,
  showBackButton,
});

export default {
  pageHasNavigated,
};
