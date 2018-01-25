import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "../../actions/eventsActions";

import EventPageView from "./EventViewPage";

class EventPage extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape()),
    fetchEvents: PropTypes.func,
  };

  static defaultProps = {
    events: [],
    fetchEvents: () => {},
  };

  static mapStateToProps = state => ({
    events: state.events.events,
    isFetching: state.events.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
  });

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const events = this.props.events.filter(
      x => Date.parse(x.end_time) >= Date.now(),
    );
    return <EventPageView events={events} />;
  }
}

export default connect(EventPage.mapStateToProps, EventPage.mapDispatchToProps)(
  EventPage,
);
