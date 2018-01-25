import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";

import {
  fetchCompetition,
  updateCompetition,
} from "../../../actions/competitionActions";
import Flash from "../../../components/Flash";
import MarkdownEditor from "../../../components/MarkdownEditor";

class EditEvent extends Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    isUpdating: PropTypes.bool,
    error: PropTypes.string,
    fetchCompetition: PropTypes.func.isRequired,
    updateCompetition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: "",
    description: "",
    location: "",
    isUpdating: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || "",
      description: props.description || "",
      location: props.location || "",
      success: false,
    };
  }

  componentDidMount() {
    if (!this.props.name) {
      this.props.fetchCompetition();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isUpdating) {
      this.setState({
        name: nextProps.name,
        description: nextProps.description,
        location: nextProps.location,
      });
    }

    // show message if success
    if (this.props.isUpdating && !nextProps.isUpdating && !nextProps.error) {
      this.setState({ success: true });
    }
  }

  onClickSave(e) {
    e.preventDefault();
    const {
      name: oldName,
      description: oldDescription,
      location: oldLocation,
    } = this.props;
    const { name, description, location } = this.state;
    // add params if changed by user.
    const params = {
      name: name !== oldName ? name : null,
      description: description !== oldDescription ? description : null,
      location: location !== oldLocation ? location : null,
    };
    // remove any null values so they're not cleared on the server.
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });
    this.props.updateCompetition(params);
  }

  render() {
    const {
      name: oldName,
      description: oldDescription,
      location: oldLocation,
      isUpdating,
    } = this.props;
    const { name, description, location, success } = this.state;
    return (
      <div className="splitview-pane">
        <div className="title-bar">
          <h1>Edit Event</h1>
        </div>

        <Flash type="success" when={success}>
          Succesfully updated event!
        </Flash>

        <form>
          <label htmlFor="competition-name">Event Name</label>
          <div className={`input-group ${name !== oldName && "edited"}`}>
            <input
              type="text"
              id="competition-name"
              disabled={isUpdating}
              placeholder="Name..."
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <label htmlFor="competition-description">Description</label>
          <MarkdownEditor
            id="competition-description"
            disabled={isUpdating}
            value={description}
            onChange={val => this.setState({ description: val })}
            className={`${description !== oldDescription ? "edited" : ""}`}
          />
          <label htmlFor="competition-location">Location</label>
          <div
            className={`input-group ${location !== oldLocation && "edited"}`}
          >
            <input
              type="text"
              id="competition-location"
              disabled={isUpdating}
              placeholder="Location..."
              value={location}
              onChange={e => this.setState({ location: e.target.value })}
            />
          </div>
          <p>
            <button disabled={isUpdating} onClick={e => this.onClickSave(e)}>
              {isUpdating ? <Icon.RefreshCw className="spinner" /> : "Save"}
            </button>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.competition.competition.name,
  description: state.competition.competition.description || "",
  location: state.competition.competition.location,
  isUpdating: state.competition.isUpdating,
  error: state.competition.error,
});

const mapDispatchToProps = dispatch => ({
  fetchCompetition: () => dispatch(fetchCompetition()),
  updateCompetition: params => dispatch(updateCompetition(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
