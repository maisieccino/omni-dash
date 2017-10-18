import React, { Component } from "react";
import * as Icon from "react-feather";

class EventDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }

  render() {
    return (
      <div>
        <div className="title-bar">
          <button className="yellow square">
            <Icon.ArrowLeft />
          </button>
          <h1>Event Name</h1>
          <button className="mint square">
            <Icon.RefreshCw />
          </button>
          <button className="mint square">
            <Icon.Bell />
          </button>
        </div>
        <h3>Starts in 2 hours</h3>
        <h3>18:00 - 19:00</h3>
        <h2>Description</h2>
        <p>Lorem ipsum blah blah blah</p>
      </div>
    );
  }
}

export default EventDetailsPage;
