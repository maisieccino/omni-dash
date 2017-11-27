import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import Flash from "libs/components/Flash";
import { EmailField, TextField } from "libs/components/Form";
import { TopNav } from "libs/components/Navigation";

import { inviteAttendee } from "libs/actions/competitionActions";

class AddAttendeePage extends Component {
  static propTypes = {
    inviteAttendee: PropTypes.func,
    isInviting: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    updateBackButton: () => {},
    inviteAttendee: () => {},
    isInviting: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      success: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { isInviting, error } = newProps;
    // if invite request finished sending
    if (this.props.isInviting && !isInviting && !error) {
      this.setState({
        success: true,
        first_name: "",
        last_name: "",
        email: "",
      });
    }
  }

  onClickSubmit(e) {
    e.preventDefault();
    const { email, first_name: firstName, last_name: lastName } = this.state;
    if (email && firstName && lastName) {
      this.setState({ success: false });
      this.props.inviteAttendee({
        email,
        first_name: firstName,
        last_name: lastName,
      });
    }
  }

  render() {
    return (
      <div>
        <TopNav title="Add New Attendee" href="/event/attendees" />

        <Flash type="alert" when={this.props.error.length > 0}>
          Error: {this.props.error}
        </Flash>
        <Flash type="success" when={this.state.success}>
          Successfully invited user!
        </Flash>

        <form>
          <EmailField
            id="attendee-email"
            label="Email Address"
            placeholder="test@example.com"
            onChange={val => this.setState({ email: val })}
            value={this.state.email}
          />

          <TextField
            id="attendee-first-name"
            label="First Name"
            placeholder="John"
            onChange={val => this.setState({ first_name: val })}
            value={this.state.first_name}
          />

          <TextField
            id="attendee-last-name"
            label="Last Name"
            placeholder="Smith"
            onChange={val => this.setState({ last_name: val })}
            value={this.state.last_name}
          />

          <p>
            We{"'"}ll send this person an email inviting them to create an
            account to see their dashboard.
          </p>
          <p>
            <button className="red" onClick={e => this.onClickSubmit(e)}>
              Invite{"  "}
              {this.props.isInviting && <Icon.RefreshCw className="spinner" />}
            </button>
          </p>
        </form>

        {/* <h2>Bulk-Add Attendees</h2>
        <form>
          <p>
            Paste a CSV file here containing the names and emails of the people
            you{"'"}d like to invite.
          </p>
          <textarea />
          <p>
            <button>Invite</button>
          </p>
        </form> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isInviting: state.competition.attendees.isInviting,
  error: state.competition.attendees.error,
});

const mapDispatchToProps = dispatch => ({
  inviteAttendee: params => dispatch(inviteAttendee(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendeePage);
