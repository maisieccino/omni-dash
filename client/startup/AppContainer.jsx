import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ActionCable from "actioncable";

import Navigation from "../components/Navigation";
import Notifications from "../components/Notifications";
import Routes from "./Routes";
import routes from "../components/routes";

import { fetchCompetition } from "../actions/competitionActions";
import {
  onReceiveNotification,
  fetchNotifications,
} from "../actions/notificationsActions";

class AppContainer extends Component {
  static propTypes = {
    fetchCompetition: PropTypes.func,
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
    fetchNotifications: () => {},
    onReceiveNotification: () => {},
    notifications: [],
    user: {},
    history: {},
    location: { pathname: "/" },
    competition: {},
  };

  static mapStateToProps = state => ({
    user: state.user.user,
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
                  <Switch location={location}>{Routes(user)}</Switch>
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
