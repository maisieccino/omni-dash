import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Icon from "react-feather";
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
        <div className="title-bar">
          <h1>
            Hello, <span className="accent">{user.first_name}</span>.
          </h1>
          <button className="square mint">
            <Icon.RefreshCw />
          </button>
        </div>
        <FeedContainer />
      </div>
    );
  }
}

export default HomePage;
