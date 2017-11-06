import React from "react";
import PropTypes from "prop-types";

const requestPermission = done => {
  console.log("Requesting notification permission...");
  Notification.requestPermission(permission => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(
          "Hi! Browser notifications are now enabled.",
        );
        console.log("done");
        done();
      });
    }
  });
};

const NotificationPermissionCard = ({ className, onGranted }) => (
  <div className={className}>
    <h2>More Helpful Notifications?</h2>
    <div className="card-body">
      <p>
        We{"'"}re able to use the latest web technologies to send notifications
        directly to your notifications area on certain browsers.
      </p>
      <p>
        If you{"'"}d be interested in this, you{"'"}ll need to give us
        permission to show you notifications.
      </p>
    </div>
    <div className="button-group">
      <a
        className="button yellow"
        target="_blank"
        rel="noopener noreferrer"
        href="https://developer.mozilla.org/en-US/docs/Web/API/notification"
      >
        Mozilla Web Docs
      </a>
      <button onClick={() => requestPermission(onGranted)}>
        Grant Permission
      </button>
    </div>
  </div>
);

NotificationPermissionCard.propTypes = {
  className: PropTypes.string,
  onGranted: PropTypes.func,
};

NotificationPermissionCard.defaultProps = {
  className: "",
  onGranted: () => {},
};

export default NotificationPermissionCard;
