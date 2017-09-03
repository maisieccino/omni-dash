import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const CurrentEvent = ({ competition }) =>
  <div className="splitview-pane">
    <h1>Current Event</h1>
    <p>
      {competition.name}
    </p>
    <p>
      <strong>Start:</strong>{" "}
      {moment(competition.start_time).format("MMMM Do YYYY, h:mm a")}
    </p>
    <p>
      <strong>End:</strong>{" "}
      {moment(competition.end_time).format("MMMM Do YYYY, h:mm a")}
    </p>
  </div>;

CurrentEvent.propTypes = {
  competition: PropTypes.shape(),
};

CurrentEvent.defaultProps = {
  competition: {},
};

export default CurrentEvent;
