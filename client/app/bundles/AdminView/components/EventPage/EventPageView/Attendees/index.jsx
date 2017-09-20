import React, { Component } from "react";
import PropTypes from "prop-types";

import AttendeeTableHeader from "./AttendeeTableHeader";

class Attendees extends Component {
  static propTypes = {
    attendees: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    attendees: [],
  };

  componentDidMount() {
    // check for attendee list and call action if not yet loaded.
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
              <tr>
                <td>{attendee.first_name}</td>
                <td>{attendee.last_name}</td>
                <td>{attendee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Attendees;
