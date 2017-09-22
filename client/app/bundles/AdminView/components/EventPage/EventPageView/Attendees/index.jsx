import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { generate } from "shortid";
import { fetchCompetitionAttendees } from "libs/actions/competitionActions";
import { Modal } from "libs/components";

import AttendeeTableHeader from "./AttendeeTableHeader";

class Attendees extends Component {
  static propTypes = {
    attendees: PropTypes.arrayOf(PropTypes.shape()),
    fetchAttendees: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    attendees: [],
    isLoading: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      isInviteModalOpen: false,
    };
  }

  componentDidMount() {
    // check for attendee list and call action if not yet loaded.
    if (this.props.attendees.length === 0) {
      this.props.fetchAttendees();
    }
  }

  render() {
    const attendees = this.props.attendees.sort(
      (a, b) => a.first_name > b.first_name,
    );
    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Attendees </h1>
          <button
            className="square"
            onClick={() => this.setState({ isInviteModalOpen: true })}
            title="Add new attendee"
          >
            <i className="fa fa-plus" />
          </button>
          <button
            className="square"
            disabled={this.props.isLoading}
            onClick={() => this.props.fetchAttendees()}
            title="Refresh"
          >
            <i
              className={`fa fa-refresh ${this.props.isLoading && "spinner"}`}
            />
          </button>
          <a
            className="square button"
            href="/competition/invites"
            title="View attendee JSON data"
          >
            <i className="fa fa-code" />
          </a>
        </div>
        {this.props.error && (
          <div className="flash alert">Error: {this.props.error}</div>
        )}
        <table>
          <AttendeeTableHeader />
          <tbody>
            {attendees.map(attendee => (
              <tr key={generate()}>
                <td>
                  {attendee.first_name} {attendee.last_name}
                </td>
                <td>{attendee.email}</td>
                <td>{attendee.has_account ? "Y" : "N"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.isInviteModalOpen && (
          <Modal
            onCloseButtonClick={() =>
              this.setState({ isInviteModalOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attendees: state.competition.attendees.attendees,
  error: state.competition.attendees.error,
  isLoading: state.competition.attendees.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchAttendees: () => dispatch(fetchCompetitionAttendees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
