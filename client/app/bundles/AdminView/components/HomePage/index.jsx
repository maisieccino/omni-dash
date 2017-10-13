/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";

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
        <h2>Your Admin Dashboard</h2>
      </div>
    );
  }
}

export default HomePage;
