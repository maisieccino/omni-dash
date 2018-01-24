import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ActionCable from "actioncable";

import { fetchCompetition } from "libs/actions/competitionActions";
import {
  onReceiveNotification,
  fetchNotifications,
} from "libs/actions/notificationsActions";
import TimelineItemPage from "libs/components/TimelineItemPage";
import SettingsPage from "libs/components/SettingsPage";
import ProfilePage from "libs/components/ProfilePage";
import Navigation from "libs/components/Navigation";
import Notifications from "libs/components/Notifications";
import routes from "../components/routes";
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

class HackerView extends Component {
  static propTypes = {
    fetchCompetition: PropTypes.func,
    fetchNotifications: PropTypes.func,
    onReceiveNotification: PropTypes.func,
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    current_user: PropTypes.shape(),
    history: PropTypes.shape(),
    location: PropTypes.shape(),
    competition: PropTypes.shape(),
  };

  static defaultProps = {
    fetchCompetition: () => {},
    fetchNotifications: () => {},
    onReceiveNotification: () => {},
    notifications: [],
    current_user: {},
    history: {},
    location: { pathname: "/" },
    competition: {},
  };

  static mapStateToProps = state => ({
    current_user: state.current_user,
    notifications: state.notifications.notifications,
    location: state.routerReducer.location,
    competition: state.competition.competition,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
    fetchNotifications: () => dispatch(fetchNotifications()),
    onReceiveNotification: notification =>
      dispatch(onReceiveNotification(notification)),
  });

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
    const eventName = nextProps.competition.name || "Event";
    document.title = notificationCount
      ? `${eventName} Dashboard (${notificationCount})`
      : `${eventName} Dashboard`;
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
    const { current_user: user, history, notifications, location } = this.props;
    const unreadNotifications = notifications.filter(x => !x.seen);
    const currentKey = location
      ? this.props.location.pathname.split("/")[1]
      : "/";
    return (
      <ConnectedRouter history={history}>
        <div>
          <Notifications notifications={unreadNotifications} />
          <Navigation
            routes={routes(user.admin)}
            notificationCount={unreadNotifications.length}
          />
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
                    <Route
                      path="/timeline/item/:id"
                      render={props => <TimelineItemPage {...props} />}
                    />
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

                    <Route path="/test" component={TestPage} />
                    {/* admin-specific pages */}
                    {user.admin && (
                      <Fragment>
                        <Route path="/event" component={EventPage} />
                        <Route path="/addEvent" component={AddEventPage} />
                        <Route path="/courses" component={CoursesPage} />
                        <Route path="/users" component={UsersPage} />
                        <Route
                          path="/event/attendees/add"
                          component={AddAttendeePage}
                        />
                      </Fragment>
                    )}
                    {/* user-specific pages */}
                    {!user.admin && (
                      <Fragment>
                        <Route
                          path="/courses"
                          component={AttendeeCoursesPage}
                        />
                        <Route path="/event" component={AttendeeEventPage} />
                      </Fragment>
                    )}
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

export default connect(
  HackerView.mapStateToProps,
  HackerView.mapDispatchToProps,
)(HackerView);
