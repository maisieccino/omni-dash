import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { messageAttendees } from "libs/actions/competitionActions";
import Flash from "libs/components/Flash";
import { InputField } from "libs/components/Form";
import MarkdownEditor from "libs/components/MarkdownEditor";

class ContactAttendees extends Component {
  static propTypes = {
    isMessagingAttendees: PropTypes.bool,
    error: PropTypes.string,
    messageAttendees: PropTypes.func,
  };

  static defaultProps = {
    isMessagingAttendees: false,
    error: "",
    messageAttendees: () => {},
  };

  static mapStateToProps = state => ({
    isMessagingAttendees: state.competition.attendees.isMessagingAttendees,
    error: state.competition.attendees.error,
  });

  static mapDispatchToProps = dispatch => ({
    messageAttendees: (title, message) =>
      dispatch(messageAttendees(title, message)),
  });

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      success: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isMessagingAttendees &&
      !nextProps.error &&
      !nextProps.isMessagingAttendees
    ) {
      this.setState({
        success: true,
        title: "",
        message: "",
      });
    }
  }

  render() {
    const { isMessagingAttendees, error } = this.props;
    const { title, message, success } = this.state;
    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Contact Attendees</h1>
        </div>
        <Flash when={!isMessagingAttendees && error.length > 0} type="alert">
          {error}
        </Flash>
        <Flash when={success} type="success">
          Message successfully sent!
        </Flash>
        <form>
          <p>
            Contact your attendees by sending them a notification. If they aren{"'"}t
            logged in, they{"'"}ll receive an email as well.
          </p>
          <InputField
            id="message-title"
            label="Title"
            placeholder="Hello!"
            value={title}
            onChange={val => this.setState({ title: val, success: false })}
          />

          <label htmlFor="message-body">Message Content</label>
          <MarkdownEditor
            id="message-body"
            value={message}
            onChange={val => this.setState({ message: val, success: false })}
          />
          <p>
            <button
              onClick={() => {
                this.props.messageAttendees(title, message);
              }}
              disabled={isMessagingAttendees}
              className="red"
            >
              {isMessagingAttendees ? (
                <Icon.RefreshCw className="spinner" />
              ) : (
                [<span key={0}>Send</span>, <Icon.ChevronsRight key={1} />]
              )}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(
  ContactAttendees.mapStateToProps,
  ContactAttendees.mapDispatchToProps,
)(ContactAttendees);
