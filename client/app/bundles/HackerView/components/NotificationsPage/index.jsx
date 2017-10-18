import React from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const NotificationsPage = () => (
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
    <div className="feed">
      {/* <h3 className="help-text">You have no notifications. Hooray!</h3> */}
      <div className="feed-card">
        <div className="card-body">
          <h2>Test Notification</h2>
          <p>
            Your tracked event, {'"'}React Workshop{'"'}, will begin shortly in
            room G08.
          </p>
        </div>
        <div className="card-footer">
          <p>
            <i>6 minutes ago</i>
          </p>
          <span className="buttons">
            <button className="square red" title="Snooze this notification">
              <Icon.Clock />
            </button>
            <button className="square red" title="Dismiss this notification">
              <Icon.X />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationsPage;
