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

const Notification = ({ title, message, type, onCloseClick }) => (
  <div className="notification">
    <div className="notification-content">
      <p>
        <strong>{title}</strong>
      </p>
      <p>{message}</p>
    </div>
    <div className="notification-buttons">
      <button onClick={() => onCloseClick()}>
        <Icon.X />
      </button>
      <div className="icon">{getIcon(type)}</div>
    </div>
  </div>
);

Notification.propTypes = {
  // id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.oneOf(["event", "message", "generic"]),
  onCloseClick: PropTypes.func,
};

Notification.defaultProps = {
  message: "",
  type: "generic",
  onCloseClick: () => {},
};

export default Notification;
