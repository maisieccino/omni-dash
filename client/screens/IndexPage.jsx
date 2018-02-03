import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePage from "./HomePage";

class IndexPage extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
    user: state.user.currentUser,
  });

  static propTypes = {
    competition: PropTypes.shape(),
    user: PropTypes.shape(),
  };

  static defaultProps = {
    competition: {},
    user: {},
  };

  render() {
    const { competition, user } = this.props;
    if (Object.keys(user).length) {
      return <HomePage user={user} />;
    }
    return (
      <div>
        <h1>
          <span className="accent">{competition.name}</span> Dashboard
        </h1>
        <h2>Powered by Omni Dash</h2>
      </div>
    );
  }
}

export default connect(IndexPage.mapStateToProps)(IndexPage);
