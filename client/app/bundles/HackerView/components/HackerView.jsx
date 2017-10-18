import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import EventDetailPage from "libs/components/EventDetailPage";
import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation from "libs/components/Navigation";
import HomePage from "./HomePage";
import CoursesPage from "./CoursesPage";
import EventPage from "./EventPage";
import NotificationsPage from "./NotificationsPage";
import routes from "./routes";

class HackerView extends Component {
  static propTypes = {
    fetchCompetition: PropTypes.func,
    current_user: PropTypes.shape(),
    history: PropTypes.shape(),
  };

  static defaultProps = {
    fetchCompetition: () => {},
    current_user: {},
    history: {},
  };

  componentDidMount() {
    this.props.fetchCompetition();
  }

  render() {
    const { current_user: currentUser, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Navigation routes={routes} />
          <div className="page">
            <Switch>
              <Route
                exact
                path="/"
                render={() => <HomePage user={currentUser} />}
              />
              <Route path="/courses" component={CoursesPage} />
              <Route
                path="/event/detail/:id"
                render={props => <EventDetailPage {...props} />}
              />
              <Route path="/event" component={EventPage} />
              <Route path="/notifications" component={NotificationsPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route
                path="/user/:id"
                render={props => <ProfilePage {...props} />}
              />
              <Route path="/settings" component={SettingsPage} />
            </Switch>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default HackerView;
