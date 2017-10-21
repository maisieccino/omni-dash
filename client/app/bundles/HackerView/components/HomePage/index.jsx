import React, { Component } from "react";
import PropTypes from "prop-types";
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

export default HomePage;
