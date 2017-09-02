import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "libs/actions/pageNavActions";
import { fetchCompetition } from "../../actions/competitionActions";

import EventPageView from "./EventPageView";
import CreateEvent from "./CreateEvent";

class EventsPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
    getCompetition: PropTypes.func.isRequired,
    competition: PropTypes.shape(),
    error: PropTypes.string,
  };

  static defaultProps = {
    competition: {},
    error: "",
  };

  componentDidMount() {
    this.props.updateBackButton();
    this.props.getCompetition();
  }

  render() {
    return (
      <div>
        {/* Show alert if there's an error fetching competition
          (not including if competition doesn't yet exist)
        */}
        {this.props.error &&
          this.props.error !== "404 Not Found" &&
          <div className="alert">
            <strong>Error:</strong> {this.props.error}
          </div>}

        <h1>Event</h1>
        <p>
          Create/manage the current event along with its timetable, venue, and
          any important information.
        </p>
        {!this.props.error.length > 0
          ? <EventPageView competition={this.props.competition} />
          : <div>
              <h2>Create New Event</h2>
              <CreateEvent />
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.competition,
});

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
  getCompetition: () => dispatch(fetchCompetition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);