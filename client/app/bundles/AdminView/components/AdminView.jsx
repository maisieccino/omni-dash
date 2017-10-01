/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";

import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation, { TopNav } from "libs/components/Navigation";
import routes from "./routes";
import HomePage from "./HomePage";
import UsersPage from "./UsersPage";
import EventPage from "./EventPage";
import CoursesPage from "./CoursesPage";
import AddAttendeePage from "./AddAttendeePage";
import AddEventPage from "./AddEventPage";

const AdminView = ({ current_user: user, history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Navigation routes={routes} />
      <div className="page">
        <TopNav />
        <Switch>
          <Route exact path="/" render={() => <HomePage user={user} />} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/users" component={UsersPage} />
          <Route
            path="/user/:id"
            render={props => <ProfilePage showBackButton {...props} />}
          />
          <Route path="/event/attendees/add" component={AddAttendeePage} />
          <Route path="/event" component={EventPage} />
          <Route path="/addEvent" component={AddEventPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </div>
    </div>
  </ConnectedRouter>
);

export default AdminView;
