/* eslint react/no-danger: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import marked from "marked";
import * as Icon from "react-feather";
import { fetchCompetition } from "../../../../actions/competitionActions";
import { fetchEvents } from "../../../../actions/eventsActions";
import Progress from "../../../../components/Progress";
import Timeline from "../../../../components/Timeline";
import EventProgress from "./EventProgress";

class OverviewPage extends Component {
  static EVENT_COUNT_LIMIT = 5;

  static propTypes = {
    competition: PropTypes.shape(),
    events: PropTypes.arrayOf(PropTypes.shape()),
    isFetchingEvents: PropTypes.bool,
    fetchCompetition: PropTypes.func,
    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    competition: {},
    events: [],
    isFetchingEvents: false,
    fetchCompetition: () => {},
    fetchEvents: () => {},
  };

  static mapStateToProps = state => ({
    competition: state.competition.competition,
    events: state.events.events,
    isFetchingEvents: state.events.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
    fetchEvents: () => dispatch(fetchEvents()),
  });

  constructor(props) {
    super(props);
    // checks whether we have ran the initial fetches on
    // these endpoints. prevents them repeatedly being
    // fetched :D
    this.state = {
      initialCompetitionFetch: false,
    };
  }

  componentDidMount() {
    if (
      !this.state.initialCompetitionFetch &&
      !Object.keys(this.props.competition).length
    ) {
      this.state.initialCompetitionFetch = true;
      this.props.fetchCompetition();
    }
  }

  render() {
    const { competition, isFetchingEvents } = this.props;

    const {
      name = "",
      start_time: startTime = "",
      end_time: endTime = "",
      description = "",
    } = competition;

    // filter the events shown on the timeline to only future events,
    // and limit to 5 events.
    const events = this.props.events
      .filter(event => Date.parse(event.start_time) > Date.now())
      .slice(0, OverviewPage.EVENT_COUNT_LIMIT - 1);

    // calculate duration of event, so we can draw a nice progress bar
    const timeRemaining = moment.duration(moment(endTime).diff(moment()));
    const fullDuration = moment.duration(
      moment(endTime).diff(moment(startTime)),
    );
    const progress = 100 - timeRemaining * 100 / fullDuration;
    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Event Overview</h1>
        </div>

        <h2>{name}</h2>
        <p>
          <strong>Start</strong>:{" "}
          {moment(startTime).format("dddd Do MMMM YYYY, hh:MM a")}
        </p>
        <p>
          <strong>End</strong>:{" "}
          {moment(endTime).format("dddd Do MMMM YYYY, hh:MM a")}
        </p>

        <h2>Event Progress</h2>
        <h3 className="help-text">
          <EventProgress
            startTime={startTime}
            timeRemaining={timeRemaining}
            eventName={name}
          />
        </h3>
        <p>
          <Progress value={progress} max={100} />
        </p>

        <h2>Description</h2>
        <div dangerouslySetInnerHTML={{ __html: marked(description || "") }} />

        <hr />
        <div className="title-bar">
          <h1>Upcoming Events</h1>
          <button
            className="mint square"
            title="Refresh Information"
            disabled={isFetchingEvents}
            onClick={() => this.props.fetchEvents()}
          >
            <Icon.RefreshCw className={isFetchingEvents ? "spinner" : ""} />
          </button>
        </div>

        <Timeline
          events={events}
          helpText="There's no upcoming events."
          isLoading={isFetchingEvents}
        />
      </div>
    );
  }
}

export default connect(
  OverviewPage.mapStateToProps,
  OverviewPage.mapDispatchToProps,
)(OverviewPage);
