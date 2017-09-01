import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "libs/actions/pageNavActions";

class CompetitionsPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.updateBackButton();
  }

  render() {
    return (
      <div>
        <h1>Hackathons</h1>
        <p>Manage all hackathons stored on the system.</p>
        <h2>Current Event</h2>
        <p>Hatch x UCL 2017</p>
        <p>24th - 25th November</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionsPage);
