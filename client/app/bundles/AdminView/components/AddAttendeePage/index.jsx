import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import Flash from "libs/components/Flash";
// import { TextField } from "libs/components/Form";
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

        <Flash type="alert" when={this.props.error}>
          Error: {this.props.error}
        </Flash>
        <Flash type="success" when={this.state.success}>
          Successfully invited user!
        </Flash>

        <form>
          <label htmlFor="attendee-email">Email Address</label>
          <div className="input-group">
            <input
              id="attendee-email"
              type="email"
              placeholder="test@example.com"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </div>

          <label htmlFor="attendee-first-name">First Name</label>
          <div className="input-group">
            <input
              id="attendee-first-name"
              type="text"
              placeholder="John"
              onChange={e => this.setState({ first_name: e.target.value })}
              value={this.state.first_name}
            />
          </div>

          <label htmlFor="attendee-last-name">Last Name</label>
          <div className="input-group">
            <input
              id="attendee-last-name"
              type="text"
              placeholder="Smith"
              onChange={e => this.setState({ last_name: e.target.value })}
              value={this.state.last_name}
            />
          </div>

          <p>
            We{"'"}ll send this person an email inviting them to create an
            account to see their dashboard.
          </p>
          <p>
            <button onClick={e => this.onClickSubmit(e)}>
              Invite{" "}
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
