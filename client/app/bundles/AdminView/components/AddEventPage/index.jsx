import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import MarkdownEditor from "libs/components/MarkdownEditor";

import { pageHasNavigated } from "libs/actions/pageNavActions";
import { createEvent } from "libs/actions/eventsActions";

class AddEventPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func,
    createEvent: PropTypes.func,
    isCreating: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
    updateBackButton: () => {},
    createEvent: () => {},
    isCreating: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      start_time: moment().format(),
      end_time: moment()
        .add(1, "hour")
        .format(),
      success: false,
    };
  }

  componentDidMount() {
    this.props.updateBackButton();
  }

  componentWillReceiveProps(newProps) {
    const { isCreating, error } = newProps;
    // if invite request finished sending
    if (this.props.isCreating && !isCreating && !error) {
      this.setState({
        success: true,
        name: "",
        description: "",
        start_time: moment().format(),
        end_time: moment()
          .add(1, "hour")
          .format(),
      });
    }
  }

  onClickSubmit(e) {
    e.preventDefault();
    const {
      name,
      description,
      start_time: startTime,
      end_time: endTime,
    } = this.state;
    if (name && startTime) {
      this.setState({ success: false });
      this.props.createEvent({
        name,
        description,
        start_time: startTime,
        end_time: endTime,
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Add New Event</h1>

        {this.props.error && (
          <div className="alert flash">Error: {this.props.error}</div>
        )}

        {this.state.success && (
          <div className="success flash">Successfully invited user!</div>
        )}

        <form>
          <label htmlFor="event-name">Name</label>
          <div className="input-group">
            <input
              id="event-name"
              type="text"
              placeholder="React Workshop"
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>

          <MarkdownEditor
            id="event-description"
            onChange={val => this.setState({ description: val })}
            value={this.state.description}
          />

          {/* TODO: Create DateTime input component */}
          <label htmlFor="event-startTime">Start Time</label>
          <div className="input-group">
            <input
              id="event-startTime"
              type="text"
              placeholder="2017-01-01"
              onChange={e => this.setState({ start_time: e.target.value })}
              value={this.state.start_time}
            />
          </div>

          <label htmlFor="event-endTime">End Time</label>
          <div className="input-group">
            <input
              id="event-endTime"
              type="text"
              placeholder="2017-01-01"
              onChange={e => this.setState({ end_time: e.target.value })}
              value={this.state.end_time}
            />
          </div>

          <p>
            <button onClick={e => this.onClickSubmit(e)}>
              {this.props.isCreating && (
                <i className="fa fa-refresh spinner" />
              )}{" "}
              Invite
            </button>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreating: state.events.isCreating,
  error: state.events.error,
});

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageHasNavigated("/event/timeline", true)),
  createEvent: params => dispatch(createEvent(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage);
