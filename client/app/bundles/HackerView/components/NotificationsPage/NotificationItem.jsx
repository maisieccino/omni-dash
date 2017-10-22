import React from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
import moment from "moment";

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

const NotificationItem = ({ title, message, type, time, onCloseClick }) => (
  <div className="feed-card">
    <div className="card-body">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </div>
    <div className="card-footer">
      <p>
        <i>{moment(time).fromNow()}</i>
      </p>
      <span className="buttons">
        <div className="icon">{getIcon(type)}</div>
        <button className="square red" title="Snooze this notification">
          <Icon.Clock />
        </button>
        <button
          className="square red"
          title="Dismiss this notification"
          onClick={() => onCloseClick()}
        >
          <Icon.X />
        </button>
      </span>
    </div>
  </div>
);

NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.instanceOf(moment), PropTypes.string]),
  type: PropTypes.oneOf(["event", "message", "generic"]),
  onCloseClick: PropTypes.func,
};

NotificationItem.defaultProps = {
  message: "",
  type: "generic",
  time: moment(),
  onCloseClick: () => {},
};

export default NotificationItem;
