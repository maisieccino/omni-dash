import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TimelineItem = ({ name, startTime, endTime, children }) => {
  const start = startTime ? moment(startTime).format("HH:mm") : null;
  const end = endTime ? moment(endTime).format("HH:mm") : "TBC";
  const timeText = start ? `${start} - ${end}` : "Time TBC";
  return (
    <div className="timeline-item">
      <div className="timeline-item-header">
        <h1>{name}</h1>
        <h2>{timeText}</h2>
      </div>
      <div className="timeline-item-content">{children}</div>
    </div>
  );
};

TimelineItem.propTypes = {
  name: PropTypes.string,
  startTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.string,
  ]),
  endTime: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.string,
  ]),
  children: PropTypes.node,
};

TimelineItem.defaultProps = {
  name: "Untitled Event",
  startTime: null,
  endTime: null,
  children: (
    <p>
      <i>This event has not yet been given a description</i>
    </p>
  ),
};

export default TimelineItem;
