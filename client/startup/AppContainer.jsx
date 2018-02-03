import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { Redirect, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ActionCable from "actioncable";

import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
// import Routes from "./Routes";
import routes from "../components/routes";

import { fetchCompetition } from "../actions/competitionActions";
import {
  onReceiveNotification,
  fetchNotifications,
} from "../actions/notificationsActions";
import { fetchUser } from "../actions/userActions";

import TimelineItemPage from "../screens/TimelineItemPage";
import SettingsPage from "../screens/SettingsPage";
import ProfilePage from "../screens/ProfilePage";
import UsersPage from "../screens/UsersPage";
import EventPage from "../screens/EventPage";
import CoursesPage from "../screens/CoursesPage";
import AddAttendeePage from "../screens/AddAttendeePage";
import AddEventPage from "../screens/AddEventPage";
import TestPage from "../screens/TestPage";
import AttendeeCoursesPage from "../screens/AttendeeCoursesPage";
import NotificationsPage from "../screens/NotificationsPage";
import IndexPage from "../screens/IndexPage";
import SignInPage from "../screens/Auth/SignInPage";
import ForgotPasswordPage from "../screens/Auth/ForgotPasswordPage";
import UnauthorisedPage from "../screens/UnauthorisedPage";
import NotFoundPage from "../screens/NotFoundPage";

const isAuthed = user => Object.keys(user).length > 0;

const isAdmin = user => user.admin;

class AppContainer extends Component {
  static propTypes = {
    fetchCompetition: PropTypes.func,
    fetchUser: PropTypes.func,
    fetchNotifications: PropTypes.func,
    onReceiveNotification: PropTypes.func,
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    user: PropTypes.shape(),
    history: PropTypes.shape(),
    location: PropTypes.shape(),
    competition: PropTypes.shape(),
  };

  static defaultProps = {
    fetchCompetition: () => {},
    fetchUser: () => {},
    fetchNotifications: () => {},
    onReceiveNotification: () => {},
    notifications: [],
    user: {},
    history: {},
    location: { pathname: "/" },
    competition: {},
  };

  static mapStateToProps = state => ({
    user: state.user.currentUser,
    notifications: state.notifications.notifications,
    location: state.routerReducer.location,
    competition: state.competition.competition,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
    fetchUser: () => dispatch(fetchUser()),
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
    this.props.fetchUser();
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
    const { user, history, notifications, location } = this.props;
    const unreadNotifications = notifications.filter(x => !x.seen);
    const currentKey = location
      ? this.props.location.pathname.split("/")[1]
      : "/";
    return (
      <ConnectedRouter history={history}>
        <div>
          <Notifications notifications={unreadNotifications} />
          <Navigation
            routes={routes(user, user.admin)}
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
                    <Route path="/sign_in" component={SignInPage} />
                    <Route
                      path="/forgot_password"
                      render={() =>
                        isAuthed(user) ? (
                          <Redirect to="/" />
                        ) : (
                          <ForgotPasswordPage />
                        )}
                    />
                    <Route exact path="/" component={IndexPage} />
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
                    <Route
                      path="/event/attendees/add"
                      component={AddAttendeePage}
                    />
                    <Route path="/event" component={EventPage} />
                    <Route
                      path="/addEvent"
                      render={() =>
                        isAdmin(user) ? <AddEventPage /> : <UnauthorisedPage />}
                    />
                    <Route path="/courses" component={CoursesPage} />
                    <Route
                      path="/users"
                      render={() =>
                        isAdmin(user) ? <UsersPage /> : <UnauthorisedPage />}
                    />
                    {/* user-specific pages */}
                    <Route path="/courses" component={AttendeeCoursesPage} />
                    <Route path="*" component={NotFoundPage} />
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
  AppContainer.mapStateToProps,
  AppContainer.mapDispatchToProps,
)(AppContainer);
