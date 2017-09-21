import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {generate} from "shortid";
import {fetchCompetitionAttendees} from "libs/actions/competitionActions";
// import { Modal } from "libs/components";

import AttendeeTableHeader from "./AttendeeTableHeader";

class Attendees extends Component {
  static propTypes = {
    attendees: PropTypes.arrayOf(PropTypes.shape()),
    fetchAttendees: PropTypes.func.isRequired,
  };

  static defaultProps = {
    attendees: [],
  };

  componentDidMount() {
    // check for attendee list and call action if not yet loaded.
    if (this.props.attendees.length === 0) {
      this.props.fetchAttendees();
    }
  }

  render() {
    // const users = props.users.sort((a, b) => a.id > b.id);
    const attendees = this.props.attendees.sort(
      (a, b) => a.first_name > b.first_name,
    );
    return (
      <div className="splitview-pane">
        <h1>Attendees</h1>
        <table>
          <AttendeeTableHeader />
          <tbody>
            {attendees.map(attendee => (
              <tr key={generate()}>
                <td>{attendee.first_name}</td>
                <td>{attendee.last_name}</td>
                <td>{attendee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Modal /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attendees: state.competition.attendees.attendees,
});

const mapDispatchToProps = dispatch => ({
  fetchAttendees: () => dispatch(fetchCompetitionAttendees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendees);
