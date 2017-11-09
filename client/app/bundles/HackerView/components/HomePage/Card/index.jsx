import React from "react";
import PropTypes from "prop-types";
import CurrentEventsCard from "./CurrentEventsCard";
import CurrentLessonCard from "./CurrentLessonCard";
import CountdownCard from "./CountdownCard";
import DirectionsCard from "./DirectionsCard";
import InformationalCard from "./InformationalCard";
import NotificationPermission from "./NotificationPermissionCard";

const Card = props => {
  const { type } = props;
  const styles = ["feed-card"];

  switch (type) {
    case "currentEvents":
      styles.push("flex-card");
      return <CurrentEventsCard className={styles.join(" ")} {...props} />;
    case "currentLesson":
      return <CurrentLessonCard className={styles.join(" ")} {...props} />;
    case "countdown":
      return <CountdownCard className={styles.join(" ")} {...props} />;
    case "directions":
      return <DirectionsCard className={styles.join(" ")} {...props} />;
    case "informational":
      return <InformationalCard className={styles.join(" ")} {...props} />;
    case "notificationPermission":
      return <NotificationPermission className={styles.join(" ")} {...props} />;
    default:
      return <div />;
  }
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Card;
