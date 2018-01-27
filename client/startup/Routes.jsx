import React, { Fragment } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";

import TimelineItemPage from "../screens/TimelineItemPage";
import SettingsPage from "../screens/SettingsPage";
import ProfilePage from "../screens/ProfilePage";
import HomePage from "../screens/HomePage";
import UsersPage from "../screens/UsersPage";
import EventPage from "../screens/EventPage";
import CoursesPage from "../screens/CoursesPage";
import AddAttendeePage from "../screens/AddAttendeePage";
import AddEventPage from "../screens/AddEventPage";
import TestPage from "../screens/TestPage";
import AttendeeCoursesPage from "../screens/AttendeeCoursesPage";
import AttendeeEventPage from "../screens/AttendeeEventPage";
import NotificationsPage from "../screens/NotificationsPage";
import IndexPage from "../screens/IndexPage";
import SignInPage from "../screens/Auth/SignInPage";
import ForgotPasswordPage from "../screens/Auth/ForgotPasswordPage";

const Routes = user => {
  if (!Object.keys(user).length) {
    return (
      <Fragment>
        <Route exact path="/" component={IndexPage} />
        <Route path="/sign_in" component={SignInPage} />
        <Route path="/forgot_password" component={ForgotPasswordPage} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Route exact path="/" render={() => <HomePage user={user} />} />
      <Route
        path="/timeline/item/:id"
        render={props => <TimelineItemPage {...props} />}
      />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/user/:id" render={props => <ProfilePage {...props} />} />
      <Route path="/settings" component={SettingsPage} />

      <Route path="/test" component={TestPage} />
      {/* admin-specific pages */}
      {user.admin && (
        <Fragment>
          <Route path="/event" component={EventPage} />
          <Route path="/addEvent" component={AddEventPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/users" component={UsersPage} />
          <Route path="/event/attendees/add" component={AddAttendeePage} />
        </Fragment>
      )}
      {/* user-specific pages */}
      {!user.admin && (
        <Fragment>
          <Route path="/courses" component={AttendeeCoursesPage} />
          <Route path="/event" component={AttendeeEventPage} />
        </Fragment>
      )}
      <Route path="/auth" render={() => <Redirect to="/" />} />
    </Fragment>
  );
};

export default Routes;
