import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TimelineItemPage from "libs/components/TimelineItemPage";
import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation from "libs/components/Navigation";
import routes from "../components/routes";
import HomePage from "../screens/HomePage";
import UsersPage from "../screens/UsersPage";
import EventPage from "../screens/EventPage";
import CoursesPage from "../screens/CoursesPage";
import AddAttendeePage from "../screens/AddAttendeePage";
import AddEventPage from "../screens/AddEventPage";
import TestPage from "../screens/TestPage";

const mapStateToProps = state => ({
  current_user: state.current_user,
  location: state.routerReducer.location,
});

const NavigationComponent = ({ current_user: user, history, location }) => {
  const currentKey = location ? location.pathname.split("/")[1] : "/";
  return (
    <ConnectedRouter history={history}>
      <div>
        <Navigation routes={routes} />
        <TransitionGroup>
          <CSSTransition
            timeout={600}
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

NavigationComponent.propTypes = {
  current_user: PropTypes.shape(),
  is_admin: PropTypes.boolean,
  history: PropTypes.shape(),
  location: PropTypes.shape(),
};

NavigationComponent.defaultProps = {
  current_user: {},
  is_admin: false,
  history: {},
  location: {},
};

export default connect(mapStateToProps)(NavigationComponent);
