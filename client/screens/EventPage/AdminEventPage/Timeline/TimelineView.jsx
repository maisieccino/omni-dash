import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import Flash from "../../../../components/Flash";
import Timeline from "../../../../components/Timeline";
import { EVENTS_PATH } from "../../../../constants/eventsConstants";

const TimelineView = ({ error, events, fetchEvents, isFetching }) => (
  <div className="splitview-pane">
    <Flash type="alert" when={error !== ""}>
      {error}
    </Flash>
    <div className="title-bar">
      <h1>Event Timeline</h1>
      <Link className="red square button" to="/addEvent">
        <Icon.Plus />
      </Link>
      <button
        disabled={isFetching}
        className="mint square"
        onClick={() => fetchEvents()}
      >
        <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
      </button>
      <a className="yellow square button" href={EVENTS_PATH} target="_blank">
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
