import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FeedContainer from "./FeedContainer";

class HomePage extends Component {
  static propTypes = {
    user: PropTypes.shape(),
  };

  static defaultProps = {
    user: {},
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>
          Hello, <span className="accent">{user.first_name}</span>.
        </h1>
        <FeedContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ownProps;

export default connect(mapStateToProps)(HomePage);
