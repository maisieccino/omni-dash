import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "libs/actions/eventsActions";
import TimelineView from "./TimelineView";

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape()),
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    events: [],
    isFetching: false,
    error: "",
    fetchEvents: () => {},
  };

  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.fetchEvents();
    }
  }

  render() {
    return <TimelineView {...this.props} />;
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  isFetching: state.events.isFetching,
  error: state.events.error,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
