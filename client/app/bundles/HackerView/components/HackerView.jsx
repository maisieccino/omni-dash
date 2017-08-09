/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import Navigation from "./Navigation";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import InfoPage from "./InfoPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import TopNav from "./Navigation/TopNav";

const HackerView = ({ user, history }) => (
  <ConnectedRouter history={history} >
    <div>
      <Navigation />
      <div className="page">
        <TopNav />
        <Route exact path="/" render={() => <HomePage user={user} />} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/info" component={InfoPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/settings" component={SettingsPage} />
      </div>
    </div>
  </ConnectedRouter>
);

export default HackerView;
