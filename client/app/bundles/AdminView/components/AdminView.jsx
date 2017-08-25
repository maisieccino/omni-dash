/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import Navigation from "./Navigation";
import HomePage from "./HomePage";
import UsersPage from "./UsersPage";
import EventsPage from "./EventsPage";
import CoursesPage from "./CoursesPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import TopNav from "./Navigation/TopNav";

const AdminView = ({ user, history }) =>
  <ConnectedRouter history={history}>
    <div>
      <Navigation />
      <div className="page">
        <TopNav />
        <Route exact path="/" render={() => <HomePage user={user} />} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/users" component={UsersPage} />
        <Route
          path="/user/:id"
          render={props => <ProfilePage showBackButton {...props} />}
        />
        <Route path="/events" component={EventsPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/settings" component={SettingsPage} />
      </div>
    </div>
  </ConnectedRouter>;

export default AdminView;
