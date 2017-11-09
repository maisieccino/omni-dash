import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
    fetchNotifications: PropTypes.func,
    onReceiveNotification: PropTypes.func,
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    current_user: PropTypes.shape(),
    history: PropTypes.shape(),
    location: PropTypes.shape(),
  };

  static defaultProps = {
    fetchCompetition: () => {},
    fetchNotifications: () => {},
    onReceiveNotification: () => {},
    notifications: [],
    current_user: {},
    history: {},
    location: { pathname: "/" },
  };

  constructor(props) {
    super(props);
    this.cable = null;
  }

  componentDidMount() {
    this.props.fetchCompetition();
    this.props.fetchNotifications();
    this.subscribeChannel();
  }

  componentWillReceiveProps(nextProps) {
    const notificationCount = nextProps.notifications.filter(x => !x.seen)
      .length;
    document.title = notificationCount
      ? `Hatch Site (${notificationCount})`
      : "Hatch Site";
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
        received: notification => {
          /* eslint-disable no-new */
          this.props.onReceiveNotification(notification);
          new window.Notification(notification.title, {
            body: notification.message,
          });
        },
      },
    );
  }

  render() {
    const {
      current_user: currentUser,
      history,
      notifications,
      location,
    } = this.props;
    const unreadNotifications = notifications.filter(x => !x.seen);
    const currentKey = location
      ? this.props.location.pathname.split("/")[1]
      : "/";
    return (
      <ConnectedRouter history={history}>
        <div>
          <Notifications notifications={unreadNotifications} />
          <Navigation
            routes={routes}
            notificationCount={unreadNotifications.length}
          />
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
                      render={() => <HomePage user={currentUser} />}
                    />
                    <Route path="/courses" component={CoursesPage} />
                    <Route
                      path="/timeline/item/:id"
                      render={props => <TimelineItemPage {...props} />}
                    />
                    <Route path="/event" component={EventPage} />
                    <Route
                      path="/notifications"
                      component={NotificationsPage}
                    />
                    <Route path="/profile" component={ProfilePage} />
                    <Route
                      path="/user/:id"
                      render={props => <ProfilePage {...props} />}
                    />
                    <Route path="/settings" component={SettingsPage} />
                  </Switch>
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </ConnectedRouter>
    );
  }
}

export default HackerView;
