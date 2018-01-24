/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { fetchCompetition } from "libs/actions/competitionActions";
import { FeedContainer } from "libs/components";

class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape(),
    isFetching: PropTypes.bool,
    fetchCompetition: PropTypes.func,
  };

  static defaultProps = {
    user: {},
    isFetching: false,
    fetchCompetition: () => {},
  };

  static mapStateToProps = state => ({
    isFetching: state.competition.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
  });

  componentDidMount() {
    this.props.fetchCompetition();
  }

  render() {
    const { user, isFetching } = this.props;
    return (
      <div>
        <div className="title-bar">
          <h1>
            Hello, <span className="accent">{user.first_name}</span>.
          </h1>
          <button
            className="square mint"
            disabled={isFetching}
            onClick={() => this.props.fetchCompetition()}
          >
            <Icon.RefreshCw className={isFetching ? "spinner" : ""} />
          </button>
        </div>
        <h2>Your Admin Dashboard</h2>
        <FeedContainer isAdmin />
      </div>
    );
  }
}

export default connect(HomePage.mapStateToProps, HomePage.mapDispatchToProps)(
  HomePage,
);
