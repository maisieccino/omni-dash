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

const generateMapsUrl = (lat, long) => {
  const query = encodeURIComponent(`${lat},${long}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

const CurrentEvent = ({ competition }) => (
  <div className="splitview-pane">
    <div className="title-bar">
      <h1>Current Event</h1>
      <a href="/competition" className="square button" title="View raw data">
        <i className="fa fa-code" />
      </a>
    </div>
    <h2>{competition.name}</h2>
    <p>
      <strong>Start:</strong>{" "}
      {moment(competition.start_time).format("MMMM Do YYYY, h:mm a")}
    </p>
    <p>
      <strong>End:</strong>{" "}
      {moment(competition.end_time).format("MMMM Do YYYY, h:mm a")}
    </p>
    <h2>Location</h2>
    <p>{competition.location || <i>To be confirmed</i>}</p>
    <p>
      <a
        href={generateMapsUrl(competition.latitude, competition.longitude)}
        className="button"
      >
        View Map
      </a>
    </p>
    <h2>Description</h2>
    <div
      dangerouslySetInnerHTML={{
        __html: marked(competition.description || ""),
      }}
    />
  </div>
);

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
