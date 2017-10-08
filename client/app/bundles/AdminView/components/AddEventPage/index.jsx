import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import Flash from "libs/components/Flash";
import { DateTimePicker, TextField } from "libs/components/Form";
import MarkdownEditor from "libs/components/MarkdownEditor";
import { TopNav } from "libs/components/Navigation";

import { createEvent } from "libs/actions/eventsActions";

class AddEventPage extends Component {
  static propTypes = {
    createEvent: PropTypes.func,
    isCreating: PropTypes.bool,
    error: PropTypes.string,
  };

  static defaultProps = {
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
        <TopNav title="Add New Event" href="/event/timeline" />

        <Flash type="alert" when={this.props.error}>
          Error: {this.props.error}
        </Flash>
        <Flash type="success" when={this.state.success}>
          Successfully added event!
        </Flash>

        <form>
          <TextField
            id="event-name"
            label="Name"
            placeholder="React Workshop"
            onChange={val => this.setState({ name: val })}
            value={this.state.name}
          />

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
          <DateTimePicker />

          <p>
            <button onClick={e => this.onClickSubmit(e)}>
              {this.props.isCreating && (
                <Icon.RefreshCw className="spinner" />
              )}{" "}
              Create
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
  createEvent: params => dispatch(createEvent(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage);
