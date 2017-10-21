import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import ActionCable from "actioncable";

import TimelineItemPage from "libs/components/TimelineItemPage";
import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation from "libs/components/Navigation";
import Notifications from "libs/components/Notifications";
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

  constructor(props) {
    super(props);
    this.cable = null;
    this.state = {
      notifications: [],
      notificationError: "",
    };
  }

  componentDidMount() {
    this.props.fetchCompetition();
    this.subscribeChannel();
  }

  subscribeChannel() {
    const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
    const cableUrl = `${protocol}${window.location.hostname}:${window.location
      .port}/cable`;
    this.cable = ActionCable.createConsumer(cableUrl);
    this.cable.subscriptions.create(
      {
        channel: "NotificationChannel",
      },
      {
        disconnected: () =>
          this.setState({ error: "Disconnected from notifications channel" }),
        received: notification =>
          this.setState({
            notifications: [...this.state.notifications, notification],
          }),
      },
    );
  }

  render() {
    const { current_user: currentUser, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Notifications notifications={this.state.notifications} />
          <Navigation
            routes={routes}
            notificationCount={this.state.notifications.length}
          />
          <div className="page">
            <Switch>
              <Route
                exact
                path="/"
                render={() => <HomePage user={currentUser} />}
              />
              <Route path="/courses" component={CoursesPage} />
              <Route
                path="/timeline/item/:id"
                render={props => <TimelineItemPage {...props} />}
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
