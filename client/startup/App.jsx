// @flow
import React from "react";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import configureStore from "../store/adminViewStore";
import AdminViewContainer from "../containers/AdminViewContainer";
import { initialStates } from "../reducers";

const App = props => {
  const store = configureStore(Object.assign({}, initialStates, props));
  const history = createHistory({
    basename: "/home",
    forceRefresh: false,
  });

  return (
    <Provider store={store}>
      <AdminViewContainer history={history} />
    </Provider>
  );
};

export default App;
