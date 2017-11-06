import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { fetchCompetitionAttendees } from "libs/actions/competitionActions";
import { Flash, Table } from "libs/components";

class Attendees extends Component {
  static propTypes = {
    attendees: PropTypes.arrayOf(PropTypes.shape()),
    fetchAttendees: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    lastUpdated: PropTypes.shape(),
  };

  static defaultProps = {
    attendees: [],
    isLoading: false,
    error: "",
    lastUpdated: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInviteModalOpen: false,
    };
  }

  componentDidMount() {
    // check for attendee list and call action if not yet loaded.
    if (this.props.attendees.length === 0 && !this.props.isLoading) {
      this.props.fetchAttendees();
    }
  }

  render() {
    const attendees = this.props.attendees
      .sort((a, b) => a.first_name > b.first_name)
      .map(attendee => [
        `${attendee.first_name} ${attendee.last_name}`,
        attendee.email,
        attendee.has_account ? "Y" : "N",
        "",
      ]);
    const tableColumns = ["Name", "Email", "Used Invite Code?", "Actions"];

    const { lastUpdated } = this.props;

    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Attendees </h1>
          <Link
            to="/event/attendees/add"
            title="Add New Attendee"
            className="square button"
          >
            <Icon.Plus />
          </Link>
          <button
            className="mint square"
            disabled={this.props.isLoading}
            onClick={() => this.props.fetchAttendees()}
            title="Refresh"
          >
            <Icon.RefreshCw className={this.props.isLoading ? "spinner" : ""} />
          </button>
          <a
            className="yellow square button"
            href="/competition/invites"
            title="View attendee JSON data"
            target="_blank"
          >
            <Icon.Server />
          </a>
        </div>
        <p>
          <i>
            Last updated:{" "}
            {lastUpdated ? moment(lastUpdated).format("HH:mm:ss") : "Never"}
          </i>
        </p>
        <Flash type="alert" when={this.props.error.length > 0}>
          Error: {this.props.error}
        </Flash>

        {<Table rows={attendees} columns={tableColumns} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attendees: state.competition.attendees.attendees,
  error: state.competition.attendees.error,
  isLoading: state.competition.attendees.isFetching,
  lastUpdated: state.competition.attendees.lastUpdated,
});

const mapDispatchToProps = dispatch => ({
  fetchAttendees: () => dispatch(fetchCompetitionAttendees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
