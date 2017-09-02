import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as pageNavActions from "libs/actions/pageNavActions";
import { fetchCompetitions } from "../../actions/competitionsActions";

class CompetitionsPage extends Component {
  static propTypes = {
    updateBackButton: PropTypes.func.isRequired,
    getCompetitions: PropTypes.func.isRequired,
    competitions: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    competitions: [],
  };

  componentDidMount() {
    this.props.updateBackButton();
    this.props.getCompetitions();
  }

  render() {
    return (
      <div>
        <h1>Hackathons</h1>
        <p>Manage all hackathons stored on the system.</p>
        <h2>Current Event</h2>
        <p>Hatch x UCL 2017</p>
        <p>24th - 25th November</p>

        {this.props.competitions.map(competition =>
          <div>
            <p>
              {competition.name}
            </p>
          </div>,
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.competitions,
});

const mapDispatchToProps = dispatch => ({
  updateBackButton: () => dispatch(pageNavActions.pageHasNavigated("/", false)),
  getCompetitions: () => dispatch(fetchCompetitions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionsPage);
