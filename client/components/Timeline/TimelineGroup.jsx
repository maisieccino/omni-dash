import React from "react";
import PropTypes from "prop-types";

const TimelineGroup = ({ items }) => (
  <div className="timeline-group">{items}</div>
);

TimelineGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
};

TimelineGroup.defaultProps = {
  items: [],
};

export default TimelineGroup;
