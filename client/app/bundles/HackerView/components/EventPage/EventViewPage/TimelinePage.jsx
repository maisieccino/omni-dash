import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { fetchEvents } from "libs/actions/eventsActions";
import Timeline from "libs/components/Timeline";

class TimelinePage extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape()),
    isFetching: PropTypes.bool,
    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    events: [],
    isFetching: false,
    fetchEvents: () => {},
  };

  static mapStateToProps = state => ({
    events: state.events.events,
    isFetching: state.events.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
  });

  static navigateToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { events, isFetching } = this.props;
    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Timeline</h1>
          <button
            className="mint square"
            disabled={isFetching}
            onClick={() => this.props.fetchEvents()}
          >
            <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
          </button>
        </div>
        <Timeline events={events} helpText="There's no events." />
        <span className="flex horizontal">
          <button
            id="goToTopButton"
            className="mint square"
            title="Go to top"
            onClick={() => TimelinePage.navigateToTop()}
          >
            <Icon.ArrowUp />
          </button>
          <label htmlFor="goToTopButton">
            <i>Go to top</i>
          </label>
        </span>
      </div>
    );
  }
}

export default connect(
  TimelinePage.mapStateToProps,
  TimelinePage.mapDispatchToProps,
)(TimelinePage);
