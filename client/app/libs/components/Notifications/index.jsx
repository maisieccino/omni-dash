import React from "react";
import PropTypes from "prop-types";
import { generate } from "shortid";
import Notification from "./Notification";

const Notifications = ({ notifications }) => (
  <div className="notification-container">
    {notifications.map(notification => (
      <Notification
        {...notification}
        type={notification.notification_type}
        key={generate()}
      />
    ))}
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape()),
};

Notifications.defaultProps = {
  notifications: [],
};

export default Notifications;
