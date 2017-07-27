/* eslint no-underscore-dangle: 0 */
import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const configureStoreProd = (initialState) => {
  const middlewares = [
    thunk,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
  ));
};

const configureStoreDev = (initialState) => {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
  ];

  // dev tool support
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  ));

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;
