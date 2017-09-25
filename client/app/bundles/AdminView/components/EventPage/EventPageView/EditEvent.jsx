import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  fetchCompetition,
  updateCompetition,
} from "libs/actions/competitionActions";
import MarkdownEditor from "libs/components/MarkdownEditor";

class EditEvent extends Component {
  static propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    isUpdating: PropTypes.bool,
    error: PropTypes.string,
    fetchCompetition: PropTypes.func.isRequired,
    updateCompetition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: "",
    description: "",
    isUpdating: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name || "",
      description: props.description || "",
      location: "",
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
      });
    }

    // show message if success
    if (this.props.isUpdating && !nextProps.isUpdating && !nextProps.error) {
      this.setState({ success: true });
    }
  }

  onClickSave(e) {
    e.preventDefault();
    const { name: oldName, description: oldDescription } = this.props;
    const { name, description } = this.state;
    const params = {
      name: name !== oldName ? name : null,
      description: description !== oldDescription ? description : null,
    };
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
      isUpdating,
    } = this.props;
    const { name, description, success } = this.state;
    return (
      <div className="splitview-pane">
        <h1>Edit Event</h1>

        {success && (
          <div className="flash success">Successfully updated event!</div>
        )}

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
            className={`input-group ${description !== oldDescription &&
              "edited"}`}
          />
          <p>
            <button disabled={isUpdating} onClick={e => this.onClickSave(e)}>
              {isUpdating ? <i className="fa fa-refresh spinner" /> : "Save"}
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
  isUpdating: state.competition.isUpdating,
  error: state.competition.error,
});

const mapDispatchToProps = dispatch => ({
  fetchCompetition: () => dispatch(fetchCompetition()),
  updateCompetition: params => dispatch(updateCompetition(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
