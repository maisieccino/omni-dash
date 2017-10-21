import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";

const getIcon = type => {
  switch (type) {
    case "event":
      return <Icon.Calendar />;
    case "message":
      return <Icon.Mail />;
    default:
      return <Icon.Info />;
  }
};

const Notification = ({ title, message, type }) => (
  <div className="notification">
    <div className="notification-content">
      <p>
        <strong>{title}</strong>
      </p>
      <p>{message}</p>
    </div>
    <div className="notification-buttons">
      <button>
        <Icon.X />
      </button>
      <div className="icon">{getIcon(type)}</div>
    </div>
  </div>
);

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.oneOf(["event", "message", "generic"]),
};

Notification.defaultProps = {
  message: "",
  type: "generic",
};

export default Notification;
