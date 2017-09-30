import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import TimelineComponent, {
  TimelineItem,
  TimelineGroup,
  TimelineHeader,
} from "libs/components/Timeline";
import { fetchEvents } from "libs/actions/eventsActions";

const itemActions = (
  <div className="button-group">
    <button>View</button>
    <button className="square">
      <i className="fa fa-edit" />
    </button>
    <button className="square">
      <i className="fa fa-trash" />
    </button>
  </div>
);

const items = [
  <TimelineItem
    name="How To Use APIs"
    startTime={moment("2017/11/24 19:00")}
    endTime={moment("2017/11/24 20:30")}
    key={0}
  >
    <p>Learn how you can use APIs to give your project super powers!</p>
    {itemActions}
  </TimelineItem>,
  <TimelineItem
    name="Hosting Your App on AWS"
    startTime={moment("2017/11/24 19:10")}
    endTime={moment("2017/11/24 21:00")}
    key={1}
  >
    <p>
      AWS is a popular service you can use to host your app on the cloud for
      others to use.
    </p>
    {itemActions}
  </TimelineItem>,
];

const Timeline = ({ events, error, fetchEvents: fetch }) => (
  <div className="splitview-pane">
    {error && (
      <div className="flash danger">
        <p>{error}</p>
      </div>
    )}
    <div className="title-bar">
      <h1>Event Timeline</h1>
      <button className="square" onClick={() => fetch()}>
        <i className="fa fa-refresh" />
      </button>
      <button className="square">
        <i className="fa fa-code" />
      </button>
    </div>
    <pre>
      <code>{JSON.stringify(events)}</code>
    </pre>
    <TimelineComponent editable>
      <TimelineHeader>Friday 24th November</TimelineHeader>
      <TimelineItem
        name="React Workshop"
        startTime={moment("2017/11/24 18:00")}
        endTime={moment("2017/11/24 20:00")}
      >
        <p>
          In this workshop, we{"'"}ll dive straight into the world of React and
          you{"'"}ll build a responsive, interactive webapp.
        </p>
        {itemActions}
      </TimelineItem>

      <TimelineGroup items={items} />
    </TimelineComponent>
  </div>
);

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape()),
  // isFetching: PropTypes.bool,
  error: PropTypes.string,
  fetchEvents: PropTypes.func,
};

Timeline.defaultProps = {
  events: [],
  isFetching: false,
  error: "",
  fetchEvents: () => {},
};

const mapStateToProps = state => ({
  events: state.events.events,
  isFetching: state.events.isFetching,
  error: state.events.error,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
