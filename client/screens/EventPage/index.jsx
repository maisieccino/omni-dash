import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCompetition,
  saveCompetition,
} from "../../actions/competitionActions";
import { fetchEvents } from "../../actions/eventsActions";
import { Flash } from "../../components";

import AdminEventPageView from "./EventPageView";
import AttendeeEventPageView from "./EventViewPage";
import CreateEvent from "./CreateEvent";

class EventPage extends Component {
  static propTypes = {
    getCompetition: PropTypes.func.isRequired,
    saveCompetition: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    error: PropTypes.string,
    competitionExists: PropTypes.bool,
    events: PropTypes.arrayOf(PropTypes.shape()),
    user: PropTypes.shape(),
  };

  static defaultProps = {
    isSaving: false,
    isDeleting: false,
    error: "",
    competitionExists: true,
    events: [],
    user: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteSuccess: false,
    };
  }

  componentDidMount() {
    this.props.getCompetition();
    this.props.fetchEvents();
  }

  componentWillReceiveProps(nextProps) {
    // set success to true if we just deleted an event
    if (this.props.isDeleting && !nextProps.isDeleting && !nextProps.error) {
      this.setState({ deleteSuccess: true });
    }

    // we just created an event
    if (this.props.isSaving && !nextProps.isSaving && !nextProps.error) {
      this.setState({ deleteSuccess: false });
    }
  }

  render() {
    if (!this.props.user) {
      return <div>{JSON.stringify(this.props)}</div>;
    }
    if (!this.props.user.admin) {
      const events = this.props.events.filter(
        x => Date.parse(x.end_time) >= Date.now(),
      );
      return <AttendeeEventPageView events={events} />;
    }
    return (
      <div>
        {/* Show alert if there's an error fetching competition
          (not including if competition doesn't yet exist)
        */}
        <Flash
          type="alert"
          when={
            this.props.error.length > 0 && !this.props.error.includes("404")
          }
        >
          <strong>Error:</strong> {this.props.error}
        </Flash>

        <Flash type="success" when={this.state.deleteSuccess}>
          Event successfully deleted!
        </Flash>

        {this.props.competitionExists ? (
          <AdminEventPageView />
        ) : (
          <div>
            <h1>Create New Event</h1>
            <CreateEvent
              onClickSave={this.props.saveCompetition}
              isSaving={this.props.isSaving}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.competition.error,
  competitionExists: state.competition.competitionExists,
  isDeleting: state.competition.isDeleting,
  user: state.user.user,
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  getCompetition: () => dispatch(fetchCompetition()),
  saveCompetition: competition => dispatch(saveCompetition(competition)),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
