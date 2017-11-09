import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCompetition,
  saveCompetition,
} from "libs/actions/competitionActions";

import EventPageView from "./EventPageView";
import CreateEvent from "./CreateEvent";

class EventPage extends Component {
  static propTypes = {
    getCompetition: PropTypes.func.isRequired,
    saveCompetition: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
    error: PropTypes.string,
    competitionExists: PropTypes.bool,
  };

  static defaultProps = {
    isSaving: false,
    error: "",
    competitionExists: true,
  };

  componentDidMount() {
    this.props.getCompetition();
  }

  render() {
    return (
      <div>
        {/* Show alert if there's an error fetching competition
          (not including if competition doesn't yet exist)
        */}
        {this.props.error &&
          !this.props.error.includes("404") && (
            <div className="alert">
              <strong>Error:</strong> {this.props.error}
            </div>
          )}

        {this.props.competitionExists ? (
          <EventPageView />
        ) : (
          <div>
            <h2>Create New Event</h2>
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
});

const mapDispatchToProps = dispatch => ({
  getCompetition: () => dispatch(fetchCompetition()),
  saveCompetition: competition => dispatch(saveCompetition(competition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
