/* eslint react/prop-types: 0 */
import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TimelineItemPage from "libs/components/TimelineItemPage";
import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation from "libs/components/Navigation";
import routes from "./routes";
import HomePage from "./HomePage";
import UsersPage from "./UsersPage";
import EventPage from "./EventPage";
import CoursesPage from "./CoursesPage";
import AddAttendeePage from "./AddAttendeePage";
import AddEventPage from "./AddEventPage";
import TestPage from "./TestPage";

const AdminView = ({ current_user: user, history, location }) => {
  const currentKey = location ? location.pathname.split("/")[1] : "/";
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navigation routes={routes} />
        <TransitionGroup>
          <CSSTransition
            timeout={500}
            key={currentKey}
            classNames="fadeTranslate"
            mountOnEnter
            unmountOnExit
            appear
          >
            <div className="page-wrapper">
              <div className="page">
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={() => <HomePage user={user} />}
                  />
                  <Route path="/profile" component={ProfilePage} />
                  <Route path="/users" component={UsersPage} />
                  <Route
                    path="/user/:id"
                    render={props => <ProfilePage showBackButton {...props} />}
                  />
                  <Route
                    path="/timeline/item/:id"
                    render={props => <TimelineItemPage {...props} />}
                  />
                  <Route
                    path="/event/attendees/add"
                    component={AddAttendeePage}
                  />
                  <Route path="/event" component={EventPage} />
                  <Route path="/addEvent" component={AddEventPage} />
                  <Route path="/courses" component={CoursesPage} />
                  <Route path="/settings" component={SettingsPage} />
                  <Route path="/test" component={TestPage} />
                </Switch>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </ConnectedRouter>
  );
};

export default AdminView;
