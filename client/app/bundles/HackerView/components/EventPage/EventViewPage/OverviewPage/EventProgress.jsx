import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const EventProgress = ({ startTime, timeRemaining, eventName }) => {
  const timeToStart = moment.duration(moment(startTime).diff(moment()));
  if (Date.parse(startTime) > Date.now()) {
    return (
      <span>
        {eventName} begins in {timeToStart.hours()} hours and{" "}
        {timeToStart.minutes()} minutes!
      </span>
    );
  }
  if (timeRemaining > 0) {
    return (
      <span>
        {timeRemaining.hours()} hours {timeRemaining.minutes()} minutes
        remaining
      </span>
    );
  }
  return <span>{eventName} has finished. See you next time!</span>;
};

EventProgress.propTypes = {
  startTime: PropTypes.string.isRequired,
  timeRemaining: PropTypes.shape().isRequired,
  eventName: PropTypes.string,
};

EventProgress.defaultProps = {
  startTime: moment().format(),
  timeRemaining: moment.duration(),
  eventName: "",
};

export default EventProgress;
