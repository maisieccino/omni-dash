/* eslint react/no-danger: 0 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import marked from "marked";
import moment from "moment";

marked.setOptions({
  sanitize: true,
  gfm: true,
});

const CurrentEvent = ({ competition }) =>
  <div className="splitview-pane">
    <h1>Current Event</h1>
    <h2>
      {competition.name}
    </h2>
    <p>
      <strong>Start:</strong>{" "}
      {moment(competition.start_time).format("MMMM Do YYYY, h:mm a")}
    </p>
    <p>
      <strong>End:</strong>{" "}
      {moment(competition.end_time).format("MMMM Do YYYY, h:mm a")}
    </p>
    <h2>Location</h2>
    <p>
      {competition.location || <i>To be confirmed</i>}
    </p>
    <h2>Description</h2>
    <div
      dangerouslySetInnerHTML={{
        __html: marked(competition.description || ""),
      }}
    />
  </div>;

CurrentEvent.propTypes = {
  competition: PropTypes.shape(),
};

CurrentEvent.defaultProps = {
  competition: {},
};

const mapStateToProps = state => ({
  competition: state.competition.competition,
});

export default connect(mapStateToProps)(CurrentEvent);
