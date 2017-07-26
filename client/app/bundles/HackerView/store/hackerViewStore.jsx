import { createStore } from "redux";
import hackerViewReducer from "../reducers/hackerViewReducer";

const configureStore = railsProps => (
  createStore(hackerViewReducer, railsProps)
);

export default configureStore;
