import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCompetition } from "libs/actions/competitionActions";

class DeleteEvent extends Component {
  static propTypes = {
    eventName: PropTypes.string,
    isDeleting: PropTypes.bool,
    // error: PropTypes.string,
    deleteCompetition: PropTypes.func,
  };

  static defaultProps = {
    eventName: "undefined",
    isDeleting: false,
    error: "",
    deleteCompetition: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      eventInputValue: "",
      canDelete: false,
    };
  }

  onChangeEventName(e) {
    const name = e.target.value.toLowerCase();
    this.setState({
      eventInputValue: e.target.value,
      canDelete: name === this.props.eventName.toLowerCase(),
    });
  }

  render() {
    return (
      <div className="splitview-pane">
        <h1>Delete Event</h1>
        <p>
          This will delete the current event, along with any attendee details,
          all timeline data and any other associated data and files. This
          operation is <strong>irreversible</strong>.
        </p>
        <p>
          To delete the event, type in the name of the event and then click{" "}
          {'"'}delete{'"'}. Case is insensitive.
        </p>
        <div className="input-group">
          <span className="input-addon">Name</span>
          <input
            type="text"
            value={this.state.eventInputValue}
            onChange={e => this.onChangeEventName(e)}
          />
        </div>
        <p>
          <button
            disabled={!this.state.canDelete}
            onClick={() => this.props.deleteCompetition()}
          >
            {this.props.isDeleting
              ? <i aria-label="Loading" className="fa fa-refresh spinner" />
              : "Delete"}
          </button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventName: state.competition.competition.name,
  isDeleting: state.competition.isDeleting,
  error: state.competition.error,
});

const mapDispatchToProps = dispatch => ({
  deleteCompetition: () => dispatch(deleteCompetition()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEvent);
