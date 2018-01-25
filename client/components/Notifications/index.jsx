/* eslint react/no-array-index-key: 0 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import { FadeInOut, Stagger } from "react-animation-components";
import { seenNotification } from "../../actions/notificationsActions";
import Notification from "./Notification";

const Notifications = ({ notifications, onClick }) => (
  <div className="notification-container">
    <Stagger delay={50}>
      {notifications.map((notification, i) => (
        <FadeInOut key={i}>
          <Notification
            {...notification}
            type={notification.notification_type}
            key={generate()}
            onCloseClick={() => onClick(notification.id)}
          />
        </FadeInOut>
      ))}
    </Stagger>
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
