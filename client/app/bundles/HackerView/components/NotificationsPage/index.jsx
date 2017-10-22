import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { generate } from "shortid";
import * as Icon from "react-feather";
import {
  seenNotification,
  dismissNotification,
} from "libs/actions/notificationsActions";
import NotificationItem from "./NotificationItem";

class NotificationsPage extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape()),
    isFetching: PropTypes.bool,
    seenNotification: PropTypes.func,
    dismissNotification: PropTypes.func,
  };

  static defaultProps = {
    notifications: [],
    isFetching: false,
    seenNotification: () => {},
    dismissNotification: () => {},
  };

  static mapStateToProps = state => ({
    notifications: state.notifications.notifications,
    isFetching: state.notifications.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    seenNotification: id => dispatch(seenNotification(id)),
    dismissNotification: id => dispatch(dismissNotification(id)),
  });

  componentWillUnmount() {
    // when leaving page, mark unread notifications as read.
    const unread = this.props.notifications.filter(x => !x.seen);
    unread.forEach(x => this.props.seenNotification(x.id));
  }

  render() {
    const { isFetching } = this.props;
    const notifications = this.props.notifications
      .filter(notification => !notification.dismissed)
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

    const unreadNotifications = notifications.filter(x => !x.seen);
    const readNotifications = notifications.filter(x => x.seen);
    return (
      <div>
        <div className="title-bar">
          <h1>Your Notifications</h1>
          <Link
            className="yellow square button"
            title="View notification settings"
            to="/settings/notifications"
          >
            <Icon.Settings />
          </Link>
        </div>

        {/* unread  */}
        {unreadNotifications.length > 0 && (
          <div className="feed">
            <h2 key={0}>Unread Notifications</h2>
            {unreadNotifications.map(notification => (
              <NotificationItem
                {...notification}
                type={notification.type}
                time={notification.created_at}
                onCloseClick={() =>
                  this.props.dismissNotification(notification.id)}
                key={generate()}
              />
            ))}
          </div>
        )}

        {/* seen notifications */}
        {readNotifications.length > 0 && (
          <div className="feed">
            <h2 key={0}>Other Notifications</h2>
            {readNotifications.map(notification => (
              <NotificationItem
                {...notification}
                type={notification.type}
                time={notification.created_at}
                onCloseClick={() =>
                  this.props.dismissNotification(notification.id)}
                key={generate()}
              />
            ))}
          </div>
        )}

        {notifications.length === 0 && (
          <h3 className="help-text">You have no notifications. Hooray!</h3>
        )}
        {isFetching && (
          <h3 className="help-text">
            <Icon.RefreshCw className="spinner" />
          </h3>
        )}
      </div>
    );
  }
}

export default connect(
  NotificationsPage.mapStateToProps,
  NotificationsPage.mapDispatchToProps,
)(NotificationsPage);
