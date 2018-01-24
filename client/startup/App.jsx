// @flow
import React from "react";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "../store/adminViewStore";
import AppContainer from "../containers/AppContainer";
import { initialStates } from "../reducers";

const App = props => {
  const store = configureStore(Object.assign({}, initialStates, props));
  const history = createHistory({
    basename: "/home",
    forceRefresh: false,
  });

  return (
    <Provider store={store}>
      <AppContainer history={history} />
    </Provider>
  );
};

export default App;
