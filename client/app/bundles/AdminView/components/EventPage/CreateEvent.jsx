import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Route, Redirect } from "react-router-dom";
import * as Icon from "react-feather";

import { DateTimePicker } from "libs/components/Form";
import MarkdownEditor from "libs/components/MarkdownEditor";

class CreateEvent extends Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    onClickSave: PropTypes.func,
  };

  static defaultProps = {
    isSaving: false,
    onClickSave: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      start_time: moment().add(1, "days"),
      end_time: moment().add(3, "days"),
      location: "",
      capacity: 100,
    };
  }

  onStartDateChange(e) {
    const old = this.state.start_time;
    const start = moment(
      `${e.target.value} ${this.state.start_time.format("HH:mm")}`,
    );
    this.setState({ start_time: start.isValid() ? start : old });
  }

  onStartTimeChange(e) {
    const start = moment(
      `${this.state.start_time.format("YYYY-MM-DD")} ${e.target.value}`,
    );
    this.setState({ start_time: start });
  }

  onEndDateChange(e) {
    const old = this.state.end_time;
    const end = moment(
      `${e.target.value} ${this.state.end_time.format("HH:mm")}`,
    );
    this.setState({ end_time: end.isValid() ? end : old });
  }

  onEndTimeChange(e) {
    const end = moment(
      `${this.state.end_time.format("YYYY-MM-DD")} ${e.target.value}`,
    );
    this.setState({ end_time: end });
  }

  render() {
    return (
      <form>
        <p>
          There isn{"'"}t currently an event set up; add the following
          information to create one.
        </p>
        <label htmlFor="competition-name">Event Name</label>
        <div className="input-group">
          <input
            id="competition-name"
            type="text"
            placeholder="Event Name..."
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <DateTimePicker
          id="competition-start"
          placeholder="Competition Start"
          onChange={time => this.setState({ start_time: time })}
          value={this.state.start_time}
        />

        <DateTimePicker
          id="competition-end"
          placeholder="Competition End"
          onChange={time => this.setState({ end_time: time })}
          value={this.state.end_time}
        />

        <label htmlFor="competition-description">Description</label>
        <MarkdownEditor
          id="competition-description"
          value={this.state.description}
          onChange={val => this.setState({ description: val })}
        />

        <label htmlFor="competition-capacity">
          Maximum Number of Attendees
        </label>
        <div className="input-group">
          <input
            id="competition-capacity"
            type="number"
            min="0"
            value={this.state.capacity}
            onChange={e => this.setState({ capacity: e.target.value })}
          />
        </div>
        <p>
          We recommend inviting ~130% of your capacity to ensure the maximum
          number of people turn up ({Math.floor(this.state.capacity * 1.3)}{" "}
          invites)
        </p>

        <label htmlFor="competition-location">Location</label>
        <div className="input-group">
          <input
            id="competition-location"
            type="text"
            placeholder="Event Location"
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
        </div>

        <p>
          <button onClick={() => this.props.onClickSave(this.state)}>
            {this.props.isSaving ? (
              <Icon.RefreshCw aria-label="Loading" className="spinner" />
            ) : (
              "Create"
            )}
          </button>
        </p>
        <Route exact path="/event/*" render={() => <Redirect to="/event" />} />
      </form>
    );
  }
}

export default CreateEvent;
