import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { generate } from "shortid";
import TimelineComponent, {
  TimelineItem,
  TimelineHeader,
} from "libs/components/Timeline";

import ItemActions from "./ItemActions";

const createEventsList = events => {
  const dates = {};
  events.forEach(event => {
    const date = moment(event.start_time).format("YYYY-MM-DD");
    if (!dates[date]) {
      dates[date] = [event];
    } else {
      dates[date].push(event);
    }
  });

  return Object.keys(dates)
    .sort((a, b) => moment(a) > moment(b))
    .map(date => (
      <div key={generate()}>
        <TimelineHeader>{moment(date).format("dddd Do MMMM")}</TimelineHeader>
        {dates[date].map(event => (
          <TimelineItem
            name={event.name}
            key={generate()}
            startTime={event.start_time}
            endTime={event.end_time}
          >
            <p>{event.description || ""}</p>
            <ItemActions />
          </TimelineItem>
        ))}
      </div>
    ));
};

const TimelineView = ({ error, events, fetchEvents, isFetching }) => (
  <div className="splitview-pane">
    {error && (
      <div className="flash danger">
        <p>{error}</p>
      </div>
    )}
    <div className="title-bar">
      <h1>Event Timeline</h1>
      <button className="square" onClick={() => fetchEvents()}>
        <i disabled={isFetching} className="fa fa-refresh" />
      </button>
      <a className="square button" href="/competition/events">
        <i className="fa fa-code" />
      </a>
    </div>
    <TimelineComponent editable>{createEventsList(events)}</TimelineComponent>
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
