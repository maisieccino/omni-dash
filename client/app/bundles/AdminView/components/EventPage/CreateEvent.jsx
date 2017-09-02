import React, { Component } from "react";
import moment from "moment";

import MarkdownEditor from "../MarkdownEditor";

class CreateEvent extends Component {
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

  updateDescription(description) {
    this.setState({
      description,
    });
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
            onChange={() => {}}
          />
        </div>

        <label htmlFor="competition-start_date">Start Time</label>
        <div className="input-group">
          <input
            id="competition-start_date"
            type="date"
            value={this.state.start_time.format("YYYY-MM-DD")}
            placeholder="Start Date..."
          />
          <input
            id="competition-start_time"
            type="time"
            value={this.state.start_time.format("HH:mm")}
            placeholder="Start Time..."
          />
        </div>

        <label htmlFor="competition-end_date">End Time</label>
        <div className="input-group">
          <input
            id="competition-end_date"
            type="date"
            value={this.state.end_time.format("YYYY-MM-DD")}
            placeholder="End Date..."
          />
          <input
            id="competition-end_time"
            type="time"
            value={this.state.end_time.format("HH:mm")}
            placeholder="End Time..."
          />
        </div>

        <label htmlFor="competition-description">Description</label>
        <MarkdownEditor
          id="competition-description"
          value={this.state.description}
          onChange={val => this.updateDescription(val)}
        />

        <label htmlFor="competition-capacity">
          Maximum Number of Attendees
        </label>
        <div className="input-group">
          <input id="competition-capacity" type="number" min="0" />
        </div>

        <label htmlFor="competition-location">Location</label>
        <div className="input-group">
          <input
            id="competition-location"
            type="text"
            placeholder="Event Location"
          />
        </div>

        <p>
          <button>Create</button>
        </p>
      </form>
    );
  }
}

export default CreateEvent;
