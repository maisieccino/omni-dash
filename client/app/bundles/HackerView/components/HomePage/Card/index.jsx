import React from "react";
import PropTypes from "prop-types";
import CurrentEventsCard from "./CurrentEventsCard";
import CurrentLessonCard from "./CurrentLessonCard";

const Card = props => {
  const { type } = props;
  const styles = ["feed-card"];

  switch (type) {
    case "currentEvents":
      styles.push("flex-card");
      return <CurrentEventsCard className={styles.join(" ")} {...props} />;
    case "currentLesson":
      return <CurrentLessonCard className={styles.join(" ")} {...props} />;
    default:
      return <div />;
  }
};

Card.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Card;
