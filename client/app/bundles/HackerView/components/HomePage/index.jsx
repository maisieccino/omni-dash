import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { fetchCompetition } from "libs/actions/competitionActions";
import FeedContainer from "./FeedContainer";

class HomePage extends Component {
  static mapStateToProps = state => ({
    isFetching: state.competition.isFetching,
  });

  static mapDispatchToProps = dispatch => ({
    fetchCompetition: () => dispatch(fetchCompetition()),
  });

  static propTypes = {
    user: PropTypes.shape(),
    fetchCompetition: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    user: {},
    isFetching: false,
  };

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
        <FeedContainer />
      </div>
    );
  }
}

export default connect(HomePage.mapStateToProps, HomePage.mapDispatchToProps)(
  HomePage,
);
