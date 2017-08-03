/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import Navigation from "./Navigation";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import InfoPage from "./InfoPage";
import ProfilePage from "./ProfilePage";

const HackerView = ({ user, history }) => (
  <ConnectedRouter history={history} >
    <div>
      <Navigation />
      <div className="page">
        <Route exact path="/" render={() => <HomePage user={user} />} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/profile" component={ProfilePage} />
      </div>
    </div>
  </ConnectedRouter>
);

export default HackerView;
