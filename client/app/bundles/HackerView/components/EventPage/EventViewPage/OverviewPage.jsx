/* eslint react/no-danger: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import marked from "marked";
import * as Icon from "react-feather";
import { fetchCompetition } from "libs/actions/competitionActions";
import { fetchEvents } from "libs/actions/eventsActions";
import Timeline from "libs/components/Timeline";

class OverviewPage extends Component {
  static EVENT_COUNT_LIMIT = 5;

  static propTypes = {
    competition: PropTypes.shape(),
    isFetchingCompetition: PropTypes.bool,
    events: PropTypes.arrayOf(PropTypes.shape()),
    isFetchingEvents: PropTypes.bool,
    fetchCompetition: PropTypes.func,
    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    competition: {},
    isFetchingCompetition: false,
    events: [],
    isFetchingEvents: false,
    fetchCompetition: () => {},
    fetchEvents: () => {},
  };

  static mapStateToProps = state => ({
    competition: state.competition.competition,
    isFetchingCompetition: state.competition.isFetching,
    events: state.events.events,
    isFetchingEvents: state.events.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
    fetchEvents: () => dispatch(fetchEvents()),
  });

  componentDidMount() {
    if (!Object.keys(this.props.competition).length) {
      this.props.fetchCompetition();
    }

    if (!this.props.events.length) {
      this.props.fetchEvents();
    }
  }

  render() {
    const { competition, isFetchingCompetition, isFetchingEvents } = this.props;

    const {
      name,
      start_time: startTime,
      end_time: endTime,
      description,
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
          <button
            className="mint square"
            title="Refresh Information"
            disabled={isFetchingCompetition}
            onClick={() => this.props.fetchCompetition()}
          >
            <Icon.RefreshCw
              className={isFetchingCompetition ? "spinner" : ""}
            />
          </button>
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
          {timeRemaining > 0 ? (
            <span>
              {timeRemaining.hours()} hours {timeRemaining.minutes()} minutes
              remaining
            </span>
          ) : (
            `${name} has finished. See you next time!`
          )}
        </h3>
        <p>
          <progress value={progress} max={100} />
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

        <Timeline events={events} helpText="There's no upcoming events." />
      </div>
    );
  }
}

export default connect(
  OverviewPage.mapStateToProps,
  OverviewPage.mapDispatchToProps,
)(OverviewPage);
