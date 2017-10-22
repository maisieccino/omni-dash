import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import { seenNotification } from "libs/actions/notificationsActions";
import Notification from "./Notification";

const Notifications = ({ notifications, onClick }) => (
  <div className="notification-container">
    {notifications.map(notification => (
      <Notification
        {...notification}
        type={notification.notification_type}
        key={generate()}
        onCloseClick={() => onClick(notification.id)}
      />
    ))}
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape()),
  onClick: PropTypes.func,
};

Notifications.defaultProps = {
  notifications: [],
  onClick: () => {},
};

const mapDispatchToProps = dispatch => ({
  onClick: id => dispatch(seenNotification(id)),
});

export default connect(() => ({}), mapDispatchToProps)(Notifications);
