/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import Navigation from "./Navigation";
import HomePage from "./HomePage";

const HackerView = ({ user, history }) => (
  <ConnectedRouter history={history} >
    <div>
      <Navigation />
      <Link to="/test">Hello</Link>
      <Route exact path="/" render={() => <HomePage user={user} />} />
    </div>
  </ConnectedRouter>
);

export default HackerView;
