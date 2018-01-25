import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCompetition,
  saveCompetition,
} from "../../actions/competitionActions";
import { Flash } from "../../components";

import EventPageView from "./EventPageView";
import CreateEvent from "./CreateEvent";

class EventPage extends Component {
  static propTypes = {
    getCompetition: PropTypes.func.isRequired,
    saveCompetition: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    isDeleting: PropTypes.bool,
    error: PropTypes.string,
    competitionExists: PropTypes.bool,
  };

  static defaultProps = {
    isSaving: false,
    isDeleting: false,
    error: "",
    competitionExists: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleteSuccess: false,
    };
  }

  componentDidMount() {
    this.props.getCompetition();
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
          <EventPageView />
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
});

const mapDispatchToProps = dispatch => ({
  getCompetition: () => dispatch(fetchCompetition()),
  saveCompetition: competition => dispatch(saveCompetition(competition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
