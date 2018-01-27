import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class IndexPage extends Component {
  static mapStateToProps = state => ({
    competition: state.competition.competition,
  });

  static propTypes = {
    competition: PropTypes.shape(),
  };

  static defaultProps = {
    competition: {},
  };

  render() {
    const { competition } = this.props;
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
