import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import Timeline from "libs/components/Timeline";

const TimelineView = ({ error, events, fetchEvents, isFetching }) => (
  <div className="splitview-pane">
    {error && (
      <div className="flash danger">
        <p>{error}</p>
      </div>
    )}
    <div className="title-bar">
      <h1>Event Timeline</h1>
      <Link className="button square" to="/addEvent">
        <Icon.Plus />
      </Link>
      <button
        disabled={isFetching}
        className="square"
        onClick={() => fetchEvents()}
      >
        <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
      </button>
      <a className="square button" href="/competition/events">
        <Icon.Server />
      </a>
    </div>
    <Timeline events={events} editable />
  </div>
);

TimelineView.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  fetchEvents: PropTypes.func,
};

TimelineView.defaultProps = {
  events: [],
  isFetching: false,
  error: "",
  fetchEvents: () => {},
};

export default TimelineView;
