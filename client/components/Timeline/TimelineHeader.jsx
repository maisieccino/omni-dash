import React from "react";
import PropTypes from "prop-types";

const TimelineHeader = ({ children }) => (
  <div className="timeline-header">{children}</div>
);

TimelineHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TimelineHeader;
