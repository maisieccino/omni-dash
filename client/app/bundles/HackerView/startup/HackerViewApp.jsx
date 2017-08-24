// @flow
import React from "react";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "../store/hackerViewStore";
import HackerViewContainer from "../containers/HackerViewContainer";
import { initialStates } from "../reducers";

const HackerViewApp = props => {
  const store = configureStore(Object.assign({}, initialStates, props));
  const history = createHistory({
    basename: "/hackers",
    forceRefresh: false
  });

  return (
    <Provider store={store}>
      <HackerViewContainer history={history} />
    </Provider>
  );
};

export default HackerViewApp;
