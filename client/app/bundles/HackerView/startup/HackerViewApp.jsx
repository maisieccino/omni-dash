// @flow
import React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/hackerViewStore";
import HackerView from "../components/HackerView";

const HackerViewApp = props => (
  <Provider store={configureStore(props)}>
    <HackerView history={history} />
  </Provider>
);

export default HackerViewApp;
